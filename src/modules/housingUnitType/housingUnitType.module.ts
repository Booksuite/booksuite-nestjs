import { Module } from '@nestjs/common'

import { HousingUnitTypeController } from './housingUnitType.controller'
import { HousingUnitTypeService } from './housingUnitType.service'
import { HousingUnitTypeFacilityController } from './housingUnitTypeFacility.controller'
import { HousingUnitTypeFacilityService } from './housingUnitTypeFacility.service'

@Module({
    providers: [HousingUnitTypeService, HousingUnitTypeFacilityService],
    controllers: [HousingUnitTypeController, HousingUnitTypeFacilityController],
})
export class HousingUnitTypeModule {}
