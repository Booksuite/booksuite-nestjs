import { Module } from '@nestjs/common'

import { HousingUnitTypeController } from './housingUnitType.controller'
import { HousingUnitTypeService } from './housingUnitType.service'

@Module({
    providers: [HousingUnitTypeService],
    controllers: [HousingUnitTypeController],
})
export class HousingUnitTypeModule {}
