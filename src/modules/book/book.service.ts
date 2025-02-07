import { Injectable } from '@nestjs/common'

import { Book } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

    createBook(bookData: Book) {
        return this.prisma.book.create({ data: bookData })
    }

    getBook(bookID: number) {
        return this.prisma.book.findUnique({ where: { id: bookID } })
    }

    updateBook(bookData: Book, bookID: number) {
        return this.prisma.book.update({
            where: { id: bookID },
            data: bookData,
        })
    }

    deleteBook(bookID: number) {
        return this.prisma.book.delete({ where: { id: bookID } })
    }
}
