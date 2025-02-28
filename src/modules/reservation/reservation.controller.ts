import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'
import { ReservationService } from './reservation.service'

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @ApiOkResponse({ type: ReservationResponseFullDTO })
    @Post('create')
    create(
        @Body() data: ReservationCreateDTO,
    ): Promise<ReservationResponseFullDTO> {
        return this.reservationService.create(data)
    }

    @ApiOkResponse({ type: ReservationResponseFullDTO })
    @Get(':id')
    getByID(
        @Param('id') id: string,
    ): Promise<ReservationResponseFullDTO | null> {
        return this.reservationService.getById(id)
    }

    @ApiOkResponse({ type: ReservationResponseDTO })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatedData: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO | null> {
        return this.reservationService.update(id, updatedData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.reservationService.delete(id)
    }
}
