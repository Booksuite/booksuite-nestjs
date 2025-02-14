import { Module } from '@nestjs/common'

import { FacilityController } from './facility.controller'
import { FacilityService } from './facility.service'

@Module({
    providers: [FacilityService],
    controllers: [FacilityController],
})
export class FacilityModule {}
