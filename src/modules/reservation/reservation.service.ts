import { Injectable } from '@nestjs/common'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'

@Injectable()
export class ReservationService {
    constructor(private prisma: PrismaService) {}

    create(rawData: ReservationCreateDTO): Promise<ReservationResponseFullDTO> {
        return this.prisma.$transaction(async (db) => {
            const ommited = omit(rawData, ['services'])

            const newReservation = await db.reservation.create({
                data: ommited,
                include: {
                    services: { include: { service: true } },
                    HousingUnit: true,
                },
            })

            if (rawData.services) {
                await db.reservationService.createMany({
                    data: rawData.services,
                })
            }

            return newReservation
        })
    }

    get(id: string): Promise<ReservationResponseFullDTO | null> {
        return this.prisma.reservation.findUnique({
            where: { id },
            include: {
                HousingUnit: true,
                services: { include: { service: true } },
            },
        })
    }

    update(
        id: string,
        rawData: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO | null> {
        return this.prisma.$transaction(async (db) => {
            const ommited = omit(rawData, ['services'])

            if (rawData.services) {
                await db.reservationService.update({
                    where: { id: id },
                    data: rawData.services,
                })
            }

            return await db.reservation.update({
                where: { id: id },
                data: ommited,
            })
        })
    }

    delete(id: string) {
        return this.prisma.reservation.delete({ where: { id: id } })
    }
}
