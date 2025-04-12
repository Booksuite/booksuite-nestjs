import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BannerModule } from './modules/banner/banner.module'
import { CompanyModule } from './modules/company/company.module'
import { FacilityModule } from './modules/facility/facility.module'
import { HousingUnitTypeModule } from './modules/housingUnitType/housingUnitType.module'
import { MediaModule } from './modules/media/media.module'
import { OfferModule } from './modules/offer/offer.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ReservationModule } from './modules/reservation/reservation.module'
import { ServiceModule } from './modules/service/service.module'
import { SpecialDateModule } from './modules/specialDate/specialDate.module'
import { UtilityLinksModule } from './modules/utilityLinks/utilityLinks.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        HousingUnitTypeModule,
        CompanyModule,
        ServiceModule,
        OfferModule,
        ReservationModule,
        FacilityModule,
        MediaModule,
        BannerModule,
        UtilityLinksModule,
        SpecialDateModule,
    ],
})
export class AppModule {}
