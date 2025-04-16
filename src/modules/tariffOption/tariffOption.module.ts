import { Module } from '@nestjs/common'

import { TariffOptionController } from './tariffOption.controller'
import { TariffOptionService } from './tariffOption.service'

@Module({
    providers: [TariffOptionService],
    controllers: [TariffOptionController],
})
export class TariffOptionModule {}
