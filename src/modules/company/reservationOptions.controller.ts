import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { ReservationOptionDTO } from './dto/ReservationOption.dto'
import { ReservationOptionResponseFullDTO } from './dto/ReservationOptionResponse.dto'
import { ReservationOptionResponseDTO } from './dto/ReservationOptionResponse.dto copy'
import { ReservationOptionService } from './reservationOption.service'

@Controller('company/:companyId/reservationOptions')
export class ReservationOptionsController {
    constructor(private reservationOptionService: ReservationOptionService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(ReservationOptionResponseFullDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    getById(
        @Param('id') id: string,
    ): Promise<ReservationOptionResponseFullDTO | null> {
        return this.reservationOptionService.getById(id)
    }

    @ApiOkResponse({ type: ReservationOptionResponseDTO })
    @ApiBody({ type: ReservationOptionDTO })
    @Post()
    create(
        @Param('companyId') id: string,
        @Body() rawData: ReservationOptionDTO,
    ): Promise<ReservationOptionResponseDTO> {
        return this.reservationOptionService.create(id, rawData)
    }

    @ApiOkResponse({ type: ReservationOptionResponseFullDTO })
    @ApiBody({ type: ReservationOptionDTO })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() rawData: ReservationOptionDTO,
    ): Promise<ReservationOptionResponseFullDTO> {
        return this.reservationOptionService.update(id, rawData)
    }
}
