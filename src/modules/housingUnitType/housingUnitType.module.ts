import { Module } from '@nestjs/common'

import { MediaService } from '../media/media.service'

import { HousingUnitTypeController } from './housingUnitType.controller'
import { HousingUnitTypeService } from './housingUnitType.service'
import { HousingUnitTypeFacilityController } from './housingUnitTypeFacility.controller'
import { HousingUnitTypeFacilityService } from './housingUnitTypeFacility.service'
import { HousingUnitTypeMediasService } from './housingUnitTypeMedias.service'

@Module({
    providers: [
        HousingUnitTypeService,
        HousingUnitTypeFacilityService,
        HousingUnitTypeMediasService,
        MediaService,
    ],
    controllers: [HousingUnitTypeController, HousingUnitTypeFacilityController],
})
export class HousingUnitTypeModule {}
