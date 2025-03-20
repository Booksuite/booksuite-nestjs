import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBody,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'
import { ReservationResponsePaginatedDTO } from './dto/ReservationResponsePaginated.dto'
import { ReservationSearchBodyDTO } from './dto/ReservationSearchBody.dto'
import { ReservationUpdateDTO } from './dto/ReservationUpdate.dto'
import { ReservationService } from './reservation.service'

@ApiExtraModels(ReservationResponseFullDTO)
@Controller('company/:companyId/reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @ApiOkResponse({ type: ReservationResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'createReservation' })
    @Post('create')
    create(
        @Param('companyId') companyId: string,
        @Body() data: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO> {
        return this.reservationService.create(companyId, data)
    }

    @ApiOkResponse({ type: ReservationResponsePaginatedDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchReservations' })
    @Post('search')
    search(
        @Param('companyId') companyId: string,
        @Body() body: ReservationSearchBodyDTO,
        @Query('query') query?: string,
    ): Promise<ReservationResponsePaginatedDTO> {
        return this.reservationService.search(
            companyId,
            body.pagination,
            body.filter,
            body.order,
            query,
        )
    }

    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(ReservationResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'getReservationById' })
    @Get(':id')
    getByID(
        @Param('id') id: string,
    ): Promise<ReservationResponseFullDTO | null> {
        return this.reservationService.getById(id)
    }

    @ApiBody({ type: ReservationUpdateDTO })
    @ApiOkResponse({ type: ReservationResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() updatedData: ReservationUpdateDTO,
    ): Promise<ReservationResponseDTO> {
        return this.reservationService.update(id, updatedData)
    }

    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'deleteReservation' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.reservationService.delete(id)
    }
}
