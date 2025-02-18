import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { AgePolicyCreateDTO } from './dto/AgePolicyCreate.dto'

@Injectable()
export class AgePolicyService {
    constructor(private prismaService: PrismaService) {}

    async upsert(companyId: string, rawData: AgePolicyCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.AgePolicyCreateInput>()({
            ...omit(rawData, ['ageGroups']),
            company: { connect: { id: companyId } },
            ageGroups: {
                connectOrCreate: rawData.ageGroups.map((group) => ({
                    where: { id: group.id },
                    create: group,
                })),
            },
        })

        const ageGroupsToKeep = rawData.ageGroups
            .filter((g) => g.id)
            .map((group) => group.id) as string[]

        await this.prismaService.ageGroup.deleteMany({
            where: { id: { notIn: ageGroupsToKeep } },
        })

        return this.prismaService.agePolicy.upsert({
            where: { companyId },
            create: normalizedData,
            update: omit(normalizedData, ['company']),
            include: { ageGroups: true },
        })
    }
}
