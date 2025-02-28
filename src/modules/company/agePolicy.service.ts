import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { AgePolicyDTO } from './dto/AgePolicy.dto'
import { AgePolicyResponseDTO } from './dto/AgePolicyResponse.dto'
import { AgePolicyResponseFullDTO } from './dto/AgePolicyResponseFull.dto'

@Injectable()
export class AgePolicyService {
    constructor(private prismaService: PrismaService) {}

    async getByCompanyId(
        companyId: string,
    ): Promise<AgePolicyResponseDTO | null> {
        return this.prismaService.agePolicy.findUnique({
            where: { companyId },
            include: { ageGroups: true },
        })
    }

    async upsert(
        companyId: string,
        rawData: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
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
