import { Injectable } from '@nestjs/common'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'

@Injectable()
export class ReservationService {
    constructor(private prisma: PrismaService) {}

    create(rawData: ReservationCreateDTO) {
        return this.prisma.$transaction(async (db) => {
            const ommited = omit(rawData, ['services'])

            const newReservation = await db.reservation.create({
                data: ommited,
            })

            if (rawData.services) {
                rawData.services.reservationId = newReservation.id
                await db.reservationService.createMany({
                    data: rawData.services,
                })
            }
        })
    }

    get(id: string) {
        return this.prisma.reservation.findUnique({ where: { id } })
    }

    update(id: string, rawData: ReservationCreateDTO) {
        return this.prisma.$transaction(async (db) => {
            const ommited = omit(rawData, ['services'])

            await db.reservation.update({
                where: { id: id },
                data: ommited,
            })

            if (rawData.services) {
                await db.reservationService.update({
                    where: { id: id },
                    data: rawData.services,
                })
            }
        })
    }

    delete(id: string) {
        return this.prisma.reservation.delete({ where: { id: id } })
    }
}
