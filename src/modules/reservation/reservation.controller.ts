import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @Post('create')
    create(@Body() bookData: ReservationCreateDTO) {
        return this.reservationService.create(bookData)
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.reservationService.get(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatedData: ReservationCreateDTO) {
        return this.reservationService.update(id, updatedData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.reservationService.delete(id)
    }
}
