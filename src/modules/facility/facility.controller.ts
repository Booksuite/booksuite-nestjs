import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { FacilityDTO } from './dto/Facility.dto'
import { FacilityResponseDTO } from './dto/FacilityResponse.dto'
import { FacilityResponsePaginatedDTO } from './dto/FacilityResponsePaginated.dto'
import { FacilitySearchBodyDTO } from './dto/FacilitySearchBody.dto'
import { FacilityService } from './facility.service'
import { RequirePermissions } from '../auth/decorators/permissions.decorator'
import { AuthGuard } from '../auth/guards/auth.guard'


@Controller('facility')
export class FacilityController {
    constructor(private facilityService: FacilityService) {}

    @ApiOkResponse({ type: FacilityResponseDTO })
    @ApiOperation({ operationId: 'createFacility' })
    @Post('create')
    create(@Body() facilityData: FacilityDTO): Promise<FacilityResponseDTO> {
        return this.facilityService.create(facilityData)
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
    @UseGuards(AuthGuard)
    @ApiOperation({ operationId: 'getFacilityById' })
    @Get(':id')
    @RequirePermissions('read:facility')
    getById(
        @Param('id') facilityId: string,
    ): Promise<FacilityResponseDTO | null> {
        return this.facilityService.getById(facilityId)
    }

    @ApiOkResponse({ type: FacilityResponseDTO })
    @ApiOperation({ operationId: 'updateFacility' })
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
    @ApiQuery({ name: 'query', required: false, type: String })
    @ApiOperation({ operationId: 'searchFacilities' })
    search(
        @Body() body: FacilitySearchBodyDTO,
        @Query('query') query?: string,
    ): Promise<FacilityResponsePaginatedDTO> {
        return this.facilityService.search(
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }

    @ApiOperation({ operationId: 'deleteFacility' })
    @Delete(':id')
    delete(@Param('id') facilityId: string) {
        return this.facilityService.delete(facilityId)
    }
}
