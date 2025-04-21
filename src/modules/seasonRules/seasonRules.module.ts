import { Module } from '@nestjs/common'

import { SeasonRulesController } from './seasonRules.controller'
import { SeasonRulesService } from './seasonRules.service'

@Module({
    providers: [SeasonRulesService],
    controllers: [SeasonRulesController],
})
export class SeasonRulesModule {}
