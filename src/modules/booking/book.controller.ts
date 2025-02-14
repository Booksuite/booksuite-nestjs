import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { BookService } from './book.service'
import { BookingCreateDTO } from './dto/BookingCreateDTO'
import { BookingUpdateDTO } from './dto/BookingUpdateDTO'

@Controller('booking')
export class BookController {
    constructor(private bookService: BookService) {}

    @Post('create')
    create(@Body() bookData: BookingCreateDTO) {
        return this.bookService.create(bookData)
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.bookService.get(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatedData: BookingUpdateDTO) {
        return this.bookService.update(id, updatedData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.bookService.delete(id)
    }
}
