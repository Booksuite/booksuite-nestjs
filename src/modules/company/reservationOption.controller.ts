import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { ReservationOptionDTO } from './dto/ReservationOption.dto'
import { ReservationOptionPaginatedResponseDTO } from './dto/ReservationOptionPaginatedResponse.dto'
import { ReservationOptionResponseDTO } from './dto/ReservationOptionResponse.dto'
import { ReservationOptionResponseFullDTO } from './dto/ReservationOptionResponseFull.dto'
import { ReservationOptionSearchBodyDTO } from './dto/ReservationOptionSearchBodyDTO.dto'
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

    @ApiBody({ type: ReservationOptionSearchBodyDTO })
    @ApiOkResponse({ type: ReservationOptionPaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchReservationOption' })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: ReservationOptionSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<ReservationOptionPaginatedResponseDTO> {
        return await this.reservationOptionService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
