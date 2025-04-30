import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { AgePolicyDTO } from './dto/AgePolicy.dto'
import { AgePolicyResponseFullDTO } from './dto/AgePolicyResponseFull.dto'

@Injectable()
export class AgePolicyService {
    constructor(private prismaService: PrismaService) {}

    getByCompanyId(
        companyId: string,
    ): Promise<AgePolicyResponseFullDTO | null> {
        return this.prismaService.agePolicy.findUnique({
            where: { companyId },
            include: { ageGroups: true },
        })
    }

    upsert(
        companyId: string,
        policyId: string,
        rawData: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
        const normalizedCreateData =
            Prisma.validator<Prisma.AgePolicyCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                ageGroups: {
                    create: rawData.ageGroups.map((group) => ({
                        ...group,
                    })),
                },
            })

        const normalizedUpdateData =
            Prisma.validator<Prisma.AgePolicyUpdateInput>()({
                ...rawData,
                ageGroups: {
                    deleteMany: {
                        agePolicyId: policyId,
                        id: {
                            notIn: rawData.ageGroups
                                .map((group) => group.id || '')
                                .filter(Boolean),
                        },
                    },
                    upsert: rawData.ageGroups.map((group) => ({
                        where: { id: group.id || '' },
                        update: group,
                        create: group,
                    })),
                },
            })

        return this.prismaService.agePolicy.upsert({
            where: { companyId },
            create: normalizedCreateData,
            update: normalizedUpdateData,
            include: { ageGroups: true },
        })
    }
}
