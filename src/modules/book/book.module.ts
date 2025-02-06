import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
    providers: [BookService, PrismaService],
    controllers: [BookController],
})
export class BookModule {}
