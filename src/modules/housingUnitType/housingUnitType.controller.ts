import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'
import { HousingUnitTypeService } from './housingUnitType.service'

@Controller('housingUnitType')
export class HousingUnitTypeController {
    constructor(private housingUnitTypeService: HousingUnitTypeService) {}

    @Post('create')
    create(@Body() propertyData: HousingUnitTypeCreateDTO) {
        return this.housingUnitTypeService.create(propertyData)
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
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

    @Get('listByCompany/:companyId')
    listByCompanyId(@Param('companyId') companyId: string) {
        return this.housingUnitTypeService.listByCompanyId(companyId)
    }
}
