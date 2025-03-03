import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'

@Injectable()
export class ReservationService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: ReservationCreateDTO): Promise<ReservationResponseFullDTO> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationCreateInput>()({
                ...rawData,
                services: { createMany: { data: rawData.services } },
            })

        return this.prismaService.reservation.create({
            data: normalizedData,
            include: {
                housingUnit: true,
                services: { include: { service: true } },
            },
        })
    }

    getById(id: string): Promise<ReservationResponseFullDTO | null> {
        return this.prismaService.reservation.findUnique({
            where: { id },
            include: {
                housingUnit: true,
                services: { include: { service: true } },
            },
        })
    }

    update(
        id: string,
        rawData: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO | null> {
        return this.prismaService.$transaction(async (db) => {
            const ommited = omit(rawData, ['services'])

            if (rawData.services) {
                await db.reservationService.updateMany({
                    where: { id: id },
                    data: { ...rawData.services },
                })
            }

            return await db.reservation.update({
                where: { id: id },
                data: ommited,
            })
        })
    }

    delete(id: string) {
        return this.prismaService.reservation.delete({ where: { id: id } })
    }
}
