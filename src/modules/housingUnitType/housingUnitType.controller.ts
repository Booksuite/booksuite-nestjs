import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { HousingUnitType, Prisma } from '@prisma/client'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'
import { PaginatedResponse } from '@/common/types/pagination'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'
import { HousingUnitTypeService } from './housingUnitType.service'

@Controller('housingUnitType/:companyId')
export class HousingUnitTypeController {
    constructor(private housingUnitTypeService: HousingUnitTypeService) {}

    @Post('create')
    create(
        @Param('companyId') id: string,
        @Body() propertyData: HousingUnitTypeCreateDTO,
    ) {
        return this.housingUnitTypeService.create(id, propertyData)
    }

    @Get(':id')
    getByID(@Param('id') id: string): Promise<Prisma.HousingUnitTypeGetPayload<{
        include: {
            facilities: true
            medias: true
            housingUnits: true
        }
    }> | null> {
        return this.housingUnitTypeService.getById(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatedData: HousingUnitTypeCreateDTO,
    ) {
        return this.housingUnitTypeService.update(id, updatedData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.housingUnitTypeService.delete(id)
    }

    @Post('listByCompany')
    listByCompanyId(
        @Param('companyId') companyId: string,
        @Body('pagination') paginationQuery: PaginationQueryDTO,
    ): Promise<PaginatedResponse<HousingUnitType>> {
        return this.housingUnitTypeService.listByCompanyId(
            companyId,
            paginationQuery,
        )
    }
}
