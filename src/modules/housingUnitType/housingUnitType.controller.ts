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
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'
import { HousingUnitTypePaginatedResponseDTO } from './dto/HousingUnitTypePaginatedResponse.dto'
import { HousingUnitTypeResponseDTO } from './dto/HousingUnitTypeResponse.dto'
import { HousingUnitTypeResponseFullDTO } from './dto/HousingUnitTypeResponseFull.dto'
import { HousingUnitTypeSearchBodyDTO } from './dto/HousingUnitTypeSearchBody.dto'
import { HousingUnitTypeService } from './housingUnitType.service'

@Controller('company/:companyId/housingUnitType')
export class HousingUnitTypeController {
    constructor(private housingUnitTypeService: HousingUnitTypeService) {}

    @ApiOkResponse({ type: HousingUnitTypeResponseDTO })
    @ApiOperation({ operationId: 'createHousingUnitType' })
    @Post('create')
    create(
        @Param('companyId') id: string,
        @Body() propertyData: HousingUnitTypeCreateDTO,
    ): Promise<HousingUnitTypeResponseDTO> {
        return this.housingUnitTypeService.create(id, propertyData)
    }

    @ApiOkResponse({ type: HousingUnitTypeResponseFullDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'getHousingUnitTypeById' })
    @Get(':id')
    getByID(
        @Param('id') id: string,
    ): Promise<HousingUnitTypeResponseFullDTO | null> {
        return this.housingUnitTypeService.getById(id)
    }

    @ApiOkResponse({ type: HousingUnitTypeResponseDTO })
    @Patch(':id')
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'updateHousingUnitType' })
    update(
        @Param('id') id: string,
        @Body() updatedData: HousingUnitTypeCreateDTO,
    ): Promise<HousingUnitTypeResponseDTO> {
        return this.housingUnitTypeService.update(id, updatedData)
    }

    @Delete(':id')
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'deleteHousingUnitType' })
    delete(@Param('id') id: string) {
        return this.housingUnitTypeService.delete(id)
    }

    @ApiBody({ type: HousingUnitTypeSearchBodyDTO })
    @ApiOkResponse({ type: HousingUnitTypePaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchHousingUnitTypes' })
    @Post('search')
    search(
        @Param('companyId') companyId: string,
        @Body() body: HousingUnitTypeSearchBodyDTO,
        @Query() query?: string,
    ): Promise<HousingUnitTypePaginatedResponseDTO> {
        return this.housingUnitTypeService.search(
            companyId,
            body.pagination,
            body.order,
            query,
            body.filter,
        )
    }
}
