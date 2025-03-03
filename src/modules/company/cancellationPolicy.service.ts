import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

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
                        where: { id: range.id },
                    })),
                },
                company: { connect: { id: companyId } },
            })

        return this.prismaService.cancellationPolicy.upsert({
            update: omit(normalizedData, ['company']),
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
