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

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'
import { HousingUnitTypePaginatedResponseDTO } from './dto/HousingUnitTypePaginatedResponse.dto'
import { HousingUnitTypeResponseDTO } from './dto/HousingUnitTypeResponse.dto'
import { HousingUnitTypeResponseFullDTO } from './dto/HousingUnitTypeResponseFull.dto'
import { HousingUnitTypeService } from './housingUnitType.service'

@Controller('housingUnitType/:companyId')
export class HousingUnitTypeController {
    constructor(private housingUnitTypeService: HousingUnitTypeService) {}

    @ApiOkResponse({ type: HousingUnitTypeResponseDTO })
    @Post('create')
    create(
        @Param('companyId') id: string,
        @Body() propertyData: HousingUnitTypeCreateDTO,
    ): Promise<HousingUnitTypeResponseDTO> {
        return this.housingUnitTypeService.create(id, propertyData)
    }

    @ApiOkResponse({ type: HousingUnitTypeResponseFullDTO })
    @Get(':id')
    getByID(
        @Param('id') id: string,
    ): Promise<HousingUnitTypeResponseFullDTO | null> {
        return this.housingUnitTypeService.getById(id)
    }

    @ApiOkResponse({ type: HousingUnitTypeResponseDTO })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatedData: HousingUnitTypeCreateDTO,
    ): Promise<HousingUnitTypeResponseDTO> {
        return this.housingUnitTypeService.update(id, updatedData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.housingUnitTypeService.delete(id)
    }

    @ApiOkResponse({ type: HousingUnitTypePaginatedResponseDTO })
    @Post('listByCompany')
    listByCompanyId(
        @Param('companyId') companyId: string,
        @Body('pagination') paginationQuery: PaginationQueryDTO,
    ): Promise<HousingUnitTypePaginatedResponseDTO> {
        return this.housingUnitTypeService.listByCompanyId(
            companyId,
            paginationQuery,
        )
    }
}
