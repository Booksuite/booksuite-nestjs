import { Injectable } from '@nestjs/common'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BookingCreateDTO } from './dto/BookingCreateDTO'
import { BookingUpdateDTO } from './dto/BookingUpdateDTO'

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

    create(rawData: BookingCreateDTO) {
        return this.prisma.$transaction(async (db) => {
            const ommited = omit(rawData, ['services'])

            const newBooking = await db.booking.create({
                data: ommited,
            })

            if (rawData.services) {
                rawData.services.bookId = newBooking.id
                await db.bookingService.createMany({
                    data: rawData.services,
                })
            }
        })
    }

    get(bookId: string) {
        return this.prisma.booking.findUnique({ where: { id: bookId } })
    }

    update(bookId: string, rawData: BookingUpdateDTO) {
        return this.prisma.$transaction(async (db) => {
            const ommited = omit(rawData, ['services'])

            await db.booking.update({
                where: { id: rawData.id },
                data: ommited,
            })

            if (rawData.services) {
                await db.bookingService.update({
                    where: { id: rawData.services.id },
                    data: rawData.services,
                })
            }
        })
    }

    delete(bookId: string) {
        return this.prisma.booking.delete({ where: { id: bookId } })
    }
}
