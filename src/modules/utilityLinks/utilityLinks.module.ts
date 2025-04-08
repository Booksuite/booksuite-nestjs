import { Module } from '@nestjs/common'

import { UtilityLinksController } from './utilityLinks.controller'
import { UtilityLinksService } from './utilityLinks.service'

@Module({
    providers: [UtilityLinksService],
    controllers: [UtilityLinksController],
})
export class UtilityLinksModule {}
