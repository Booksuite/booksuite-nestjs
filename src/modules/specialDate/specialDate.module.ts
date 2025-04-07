import { Module } from '@nestjs/common'

import { SpecialDateService } from './specialDate.service'
import { SpecialDateController } from './specialDates.controller'

@Module({
    providers: [SpecialDateService],
    controllers: [SpecialDateController],
})
export class SpecialDateModule {}
