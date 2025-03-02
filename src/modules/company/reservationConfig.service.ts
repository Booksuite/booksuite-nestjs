import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationConfigDTO } from './dto/ReservationConfig.dto'
import { ReservationConfigResponseDTO } from './dto/ReservationConfigResponse.dto'

@Injectable()
export class ReservationConfigService {
    constructor(private prismaService: PrismaService) {}

    getByCompanyId(
        companyId: string,
    ): Promise<ReservationConfigResponseDTO | null> {
        return this.prismaService.reservationConfig.findUnique({
            where: { companyId },
        })
    }

    upsert(
        companyId: string,
        rawData: ReservationConfigDTO,
    ): Promise<ReservationConfigResponseDTO> {
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
