import { Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'

import { OfferController } from './offer.controller'
import { OfferService } from './offer.service'

@Module({
    imports: [PrismaModule],
    controllers: [OfferController],
    providers: [OfferService],
    exports: [OfferService],
})
export class OfferModule {}
