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

    async upsert(
        companyId: string,
        rawData: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
        const policy = await this.getByCompanyId(companyId)
        if (policy) {
            return this.update(policy.id, rawData)
        }
        return this.create(companyId, rawData)
    }

    update(
        policyId: string,
        rawData: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
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

        return this.prismaService.agePolicy.update({
            where: { id: policyId },
            data: normalizedUpdateData,
            include: { ageGroups: true },
        })
    }

    create(
        companyId: string,
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

        return this.prismaService.agePolicy.create({
            data: normalizedCreateData,
            include: { ageGroups: true },
        })
    }
}
