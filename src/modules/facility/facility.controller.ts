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
import { ApiBody, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { PaginationQuery } from '@/common/types/pagination'

import { FacilityDTO } from './dto/Facility.dto'
import { FacilityOrderByDTO } from './dto/FacilityOrderBy.dto'
import { FacilityResponseDTO } from './dto/FacilityResponse.dto'
import { FacilityResponsePaginatedDTO } from './dto/FacilityResponsePaginated.dto'
import { FacilitySearchBodyDTO } from './dto/FacilitySearchBody.dto'
import { FacilityService } from './facility.service'

@Controller('facility')
export class FacilityController {
    constructor(private facilityService: FacilityService) {}

    @ApiOkResponse({ type: FacilityResponseDTO })
    @Post('create')
    create(@Body() facilityData: FacilityDTO): Promise<FacilityResponseDTO> {
        return this.facilityService.create(facilityData)
    }

    @ApiOkResponse({ type: FacilityResponsePaginatedDTO })
    @Post('list')
    list(
        @Body() pagination: PaginationQuery,
        @Body() order: FacilityOrderByDTO,
    ): Promise<FacilityResponsePaginatedDTO> {
        return this.facilityService.list(pagination, order)
    }

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(FacilityResponseDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    getById(
        @Param('id') facilityId: string,
    ): Promise<FacilityResponseDTO | null> {
        return this.facilityService.getById(facilityId)
    }

    @ApiOkResponse({ type: FacilityResponseDTO })
    @Patch(':id')
    update(
        @Param('id') facilityId: string,
        @Body() facilityData: FacilityDTO,
    ): Promise<FacilityResponseDTO> {
        return this.facilityService.update(facilityId, facilityData)
    }

    @Post('search')
    @ApiBody({ type: FacilitySearchBodyDTO })
    @ApiOkResponse({ type: FacilityResponsePaginatedDTO })
    search(
        @Body() body: FacilitySearchBodyDTO,
        @Query('query') query: string,
    ): Promise<FacilityResponsePaginatedDTO> {
        return this.facilityService.search(
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }

    @Delete(':id')
    delete(@Param('id') facilityId: string) {
        return this.facilityService.delete(facilityId)
    }
}
