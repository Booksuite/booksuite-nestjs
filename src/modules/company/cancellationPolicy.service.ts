import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { CancellationPolicyDTO } from './dto/CancellationPolicy.dto'
import { CancellationPolicyResponseFullDTO } from './dto/CancellationPolicyResponseFull.dto'

@Injectable()
export class CancellationPolicyService {
    constructor(private prismaService: PrismaService) {}

    getByCompanyId(
        companyId: string,
    ): Promise<CancellationPolicyResponseFullDTO | null> {
        return this.prismaService.cancellationPolicy.findUnique({
            where: { companyId },
            include: { penaltyRanges: true },
        })
    }

    upsert(
        companyId: string,
        rawData: CancellationPolicyDTO,
    ): Promise<CancellationPolicyResponseFullDTO> {
        const normalizedData =
            Prisma.validator<Prisma.CancellationPolicyCreateInput>()({
                ...rawData,
                penaltyRanges: {
                    connectOrCreate: rawData.penaltyRanges.map((range) => ({
                        create: range,
                        where: { id: range.id || '' },
                    })),
                },
                company: { connect: { id: companyId } },
            })
        const normalizedUpdateData =
            Prisma.validator<Prisma.CancellationPolicyUpdateInput>()({
                ...rawData,
                penaltyRanges: rawData.penaltyRanges && {
                    deleteMany: {
                        id: {
                            notIn:
                                rawData.penaltyRanges
                                    .map((range) => range.id as string)
                                    .filter((item) => item) || [],
                        },
                    },
                    upsert: rawData.penaltyRanges.map((range) => ({
                        create: range,
                        update: range,
                        where: { id: range.id || '' },
                    })),
                },
            })

        return this.prismaService.cancellationPolicy.upsert({
            update: normalizedUpdateData,
            create: normalizedData,
            where: { companyId },
            include: { penaltyRanges: true },
        })
    }

    delete(companyId: string) {
        return this.prismaService.cancellationPolicy.delete({
            where: { companyId },
        })
    }
}
