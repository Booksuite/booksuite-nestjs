import { Body, Controller, Delete, Param, Post } from '@nestjs/common'

import { HouseUnitTypeFacilityCreateDTO } from './dto/HouseUnitTypeFacilityCreate.dto'
import { HousingUnitTypeFacilityService } from './housingUnitTypeFacility.service'

@Controller('housingUnitType/:housingUnitTypeId/facility')
export class HousingUnitTypeFacilityController {
    constructor(
        private houseUnitTypeFacilityService: HousingUnitTypeFacilityService,
    ) {}

    @Post('upsert')
    upsert(
        @Param('housingUnitTypeId') id: string,
        @Body() UnitTypeFacilityData: HouseUnitTypeFacilityCreateDTO,
    ) {
        return this.houseUnitTypeFacilityService.upsert(
            id,
            UnitTypeFacilityData,
        )
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.houseUnitTypeFacilityService.delete(id)
    }
}
