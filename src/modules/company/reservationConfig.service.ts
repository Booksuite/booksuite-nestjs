import { Injectable } from '@nestjs/common'
import { Prisma, ReservationConfig } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationConfigDTO } from './dto/ReservationConfig.dto'

@Injectable()
export class ReservationConfigService {
    constructor(private prismaService: PrismaService) {}

    getByCompanyId(companyId: string): Promise<ReservationConfig | null> {
        return this.prismaService.reservationConfig.findUnique({
            where: { companyId },
        })
    }

    upsert(
        companyId: string,
        rawData: ReservationConfigDTO,
    ): Promise<ReservationConfig> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationConfigUpdateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
            })

        return this.prismaService.reservationConfig.upsert({
            where: { companyId },
            create: normalizedData,
            update: omit(normalizedData, ['company']),
        })
    }
}
