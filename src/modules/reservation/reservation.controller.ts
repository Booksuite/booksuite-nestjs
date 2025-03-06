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
    ApiExtraModels,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'
import { ReservationResponsePaginatedDTO } from './dto/ReservationResponsePaginated.dto'
import { ReservationSearchBodyDTO } from './dto/ReservationSearchBody.dto'
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
    @ApiQuery({ name: 'query', type: String, required: false })
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
