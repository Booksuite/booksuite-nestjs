import { Module } from '@nestjs/common'

import { HousingUnitTypeController } from './housingUnitType.controller'
import { HousingUnitTypeService } from './housingUnitType.service'
import { HousingUnitTypeFacilityController } from './housingUnitTypeFacility/housingUnitTypeFacility.controller'
import { HousingUnitTypeFacilityService } from './housingUnitTypeFacility/housingUnitTypeFacility.service'

@Module({
    providers: [HousingUnitTypeService, HousingUnitTypeFacilityService],
    controllers: [HousingUnitTypeController, HousingUnitTypeFacilityController],
})
export class HousingUnitTypeModule {}
