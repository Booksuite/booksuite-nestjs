import { Module } from '@nestjs/common'

import { HousingUnitController } from './housingUnit.controller'
import { HousingUnitService } from './housingUnit.service'

@Module({
    providers: [HousingUnitService],
    controllers: [HousingUnitController],
})
export class HousingUnitModule {}
