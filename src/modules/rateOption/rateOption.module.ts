import { Module } from '@nestjs/common'

import { RateOptionController } from './rateOption.controller'
import { RateOptionService } from './rateOption.service'

@Module({
    providers: [RateOptionService],
    controllers: [RateOptionController],
})
export class RateOptionModule {}
