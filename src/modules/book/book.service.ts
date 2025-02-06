import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookPayload } from './book.interface';

@Injectable()
export class BookService {

    constructor(private prisma: PrismaService) {}


    async createBook(bookData: BookPayload){
        return this.prisma.book.create({data: bookData})
    }

    async getBook(bookID: number){
        return this.prisma.book.findUnique({where: {id: bookID}})
    }

    async updateBook(bookData: BookPayload, bookID: number){
        return this.prisma.book.update({
            where: {id: bookID},
            data: bookData
        })
    }

    async deleteBook(bookID: number){
        return this.prisma.book.delete({where: {id: bookID}})
    }
}
