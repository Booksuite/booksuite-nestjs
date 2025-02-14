import { Module } from '@nestjs/common'

import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
    providers: [BookService],
    controllers: [BookController],
})
export class BookModule {}
