import { Module } from '@nestjs/common'

import { HousingUnitService } from './housingUnit.service'
import { HousingUnitTypeController } from './housingUnitType.controller'
import { HousingUnitTypeService } from './housingUnitType.service'
import { HousingUnitTypeFacilityService } from './housingUnitTypeFacility.service'
import { HousingUnitTypeMediaService } from './housingUnitTypeMedias.service'

@Module({
    providers: [
        HousingUnitTypeService,
        HousingUnitTypeFacilityService,
        HousingUnitTypeMediaService,
        HousingUnitService,
    ],
    controllers: [HousingUnitTypeController],
})
export class HousingUnitTypeModule {}
