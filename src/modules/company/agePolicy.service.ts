import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { AgePolicyDTO } from './dto/AgePolicy.dto'
import { AgePolicyResponseFullDTO } from './dto/AgePolicyResponseFull.dto'

@Injectable()
export class AgePolicyService {
    constructor(private prismaService: PrismaService) {}

    async getByCompanyId(
        companyId: string,
    ): Promise<AgePolicyResponseFullDTO | null> {
        return this.prismaService.agePolicy.findUnique({
            where: { companyId },
            include: { ageGroups: true },
        })
    }

    async upsert(
        companyId: string,
        id: string,
        rawData: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
        const normalizedDataCreate =
            Prisma.validator<Prisma.AgePolicyCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                ageGroups: {
                    createMany: {
                        data: rawData.ageGroups.map((group) => ({
                            ...group,
                        })),
                    },
                },
            })
        const normalizedDataUpdate =
            Prisma.validator<Prisma.AgePolicyUpdateInput>()({
                ...rawData,

                ageGroups: rawData.ageGroups && {
                    deleteMany: {
                        agePolicyId: id,
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
            create: normalizedDataCreate,
            update: normalizedDataUpdate,
            include: { ageGroups: true },
        })
    }
}
