import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { BookingService } from './booking.service'
import { BookingCreateDTO } from './dto/BookingCreate.dto'

@Controller('booking')
export class BookingController {
    constructor(private bookService: BookingService) {}

    @Post('create')
    create(@Body() bookData: BookingCreateDTO) {
        return this.bookService.create(bookData)
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.bookService.get(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatedData: BookingCreateDTO) {
        return this.bookService.update(id, updatedData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.bookService.delete(id)
    }
}
