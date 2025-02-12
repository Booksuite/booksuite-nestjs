import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { BookingPayload } from './book.interface'
import { BookService } from './book.service'

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) {}

    @Post('create')
    async addBook(@Body() bookData: BookingPayload) {
        return this.bookService.createBook(bookData)
    }

    @Get('get/:id')
    async getBookByID(@Param('id') id: string) {
        return this.bookService.getBook(parseInt(id))
    }

    @Patch('update/:id')
    async updateBookData(
        @Param('id') id: string,
        @Body() updatedData: BookingPayload,
    ) {
        return this.bookService.updateBook(updatedData, parseInt(id))
    }

    @Delete('delete/:id')
    async deleteBook(@Param('id') id: string) {
        return this.bookService.deleteBook(parseInt(id))
    }
}
