import { Module } from '@nestjs/common'

import { BannerController } from './banner.controller'
import { BannerService } from './banner.service'

@Module({
    providers: [BannerService],
    controllers: [BannerController],
})
export class BannerModule {}
