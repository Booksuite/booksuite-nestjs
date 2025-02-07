import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Book } from '@/common/models/generated/models'

import { BookService } from './book.service'

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) {}

    @Post('create')
    addBook(@Body() bookData: Book) {
        return this.bookService.createBook(bookData)
    }

    @Get(':id')
    getBookByID(@Param('id') id: string) {
        return this.bookService.getBook(parseInt(id))
    }

    @Patch(':id')
    updateBookData(@Param('id') id: string, @Body() updatedData: Book) {
        return this.bookService.updateBook(updatedData, parseInt(id))
    }

    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return this.bookService.deleteBook(parseInt(id))
    }
}
