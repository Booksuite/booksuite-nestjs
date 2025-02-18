import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { HouseUnitTypeFacilityCreateDTO } from '../dto/HouseUnitTypeFacilityCreate.dto'

import { HousingUnitTypeFacilityService } from './housingUnitTypeFacility.service'

@Controller('housingUnitType/:housingUnitTypeId/facility')
export class HousingUnitTypeFacilityController {
    constructor(
        private houseUnitTypeFacilityService: HousingUnitTypeFacilityService,
    ) {}

    @Post('create')
    create(@Body() UnitTypeFacilityData: HouseUnitTypeFacilityCreateDTO) {
        return this.houseUnitTypeFacilityService.create(UnitTypeFacilityData)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.houseUnitTypeFacilityService.getById(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() UnitTypeFacilityData: HouseUnitTypeFacilityCreateDTO,
    ) {
        return this.houseUnitTypeFacilityService.update(
            id,
            UnitTypeFacilityData,
        )
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.houseUnitTypeFacilityService.delete(id)
    }
}
