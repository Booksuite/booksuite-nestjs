import { Module } from '@nestjs/common'

import { HousingUnitService } from './housingUnit.service'
import { HousingUnitTypeController } from './housingUnitType.controller'
import { HousingUnitTypeService } from './housingUnitType.service'

@Module({
    providers: [HousingUnitTypeService, HousingUnitService],
    controllers: [HousingUnitTypeController],
})
export class HousingUnitTypeModule {}
