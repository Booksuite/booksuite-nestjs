import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BookingPayload } from './book.interface'

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

    async createBook(data: BookingPayload) {
        return this.prisma.booking.create({ data })
    }

    async getBook(bookId: string) {
        return this.prisma.booking.findUnique({ where: { id: bookId } })
    }

    async updateBook(data: BookingPayload, bookId: string) {
        return this.prisma.booking.update({
            where: { id: bookId },
            data: data,
        })
    }

    async deleteBook(bookId: string) {
        return this.prisma.booking.delete({ where: { id: bookId } })
    }
}
