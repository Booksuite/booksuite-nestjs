import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiParam,
    getSchemaPath,
} from '@nestjs/swagger'

import { PaginationQuery } from '@/common/types/pagination'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationOrderByDTO } from './dto/ReservationOrderBy.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'
import { ReservationResponsePaginatedDTO } from './dto/ReservationResponsePaginated.dto'
import { ReservationService } from './reservation.service'

@ApiExtraModels(ReservationResponseFullDTO)
@Controller('company/:companyId/reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @ApiOkResponse({ type: ReservationResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Post('create')
    create(
        @Param('companyId') companyId: string,
        @Body() data: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO> {
        return this.reservationService.create(companyId, data)
    }

    @ApiOkResponse({ type: ReservationResponsePaginatedDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Post('list')
    list(
        @Param('companyId') companyId: string,
        @Body() pagination: PaginationQuery,
        @Body() order: ReservationOrderByDTO,
    ): Promise<ReservationResponsePaginatedDTO> {
        return this.reservationService.list(companyId, pagination, order)
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
    @Get(':id')
    getByID(
        @Param('id') id: string,
    ): Promise<ReservationResponseFullDTO | null> {
        return this.reservationService.getById(id)
    }

    @ApiOkResponse({ type: ReservationResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatedData: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO | null> {
        return this.reservationService.update(id, updatedData)
    }

    @ApiParam({ name: 'companyId', type: String })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.reservationService.delete(id)
    }
}
