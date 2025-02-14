import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { HousingUnitDTO } from './dto/HousingUnit.dto'
import { HousingUnitService } from './housingUnit.service'

@Controller('housingUnit')
export class HousingUnitController {
    constructor(private housingUnitService: HousingUnitService) {}

    @Post('create')
    create(@Body() housingData: HousingUnitDTO) {
        return this.housingUnitService.create(housingData)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.housingUnitService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() housingData: HousingUnitDTO) {
        return this.housingUnitService.update(id, housingData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.housingUnitService.delete(id)
    }
}
