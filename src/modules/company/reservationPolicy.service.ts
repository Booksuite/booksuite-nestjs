import { Injectable } from '@nestjs/common'
import { Prisma, ReservationPolicy } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationPolicyDTO } from './dto/ReservationPolicy.dto'

@Injectable()
export class ReservationPolicyService {
    constructor(private prismaService: PrismaService) {}

    upsert(companyId: string, policyData: ReservationPolicyDTO) {
        const normalizedData =
            Prisma.validator<Prisma.ReservationPolicyCreateInput>()({
                ...policyData,
                company: { connect: { id: companyId } },
            })

        return this.prismaService.reservationPolicy.upsert({
            where: { companyId },
            create: normalizedData,
            update: omit(normalizedData, ['company']),
        })
    }

    getCompanyById(companyId: string): Promise<ReservationPolicy | null> {
        return this.prismaService.reservationPolicy.findUnique({
            where: { companyId },
        })
    }

    delete(companyId: string) {
        return this.prismaService.reservationPolicy.delete({
            where: { companyId },
        })
    }
}
