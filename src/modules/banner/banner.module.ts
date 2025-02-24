import { Module } from '@nestjs/common'

import { BannerController } from './banner.controller'
import { BannerService } from './banner.service'
import { BannerMediaService } from './bannerMedia.service'

@Module({
    providers: [BannerService, BannerMediaService],
    controllers: [BannerController],
})
export class BannerModule {}
