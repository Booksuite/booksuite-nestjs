import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BannerModule } from './modules/banner/banner.module'
import { CompanyModule } from './modules/company/company.module'
import { FacilityModule } from './modules/facility/facility.module'
import { HousingUnitTypeModule } from './modules/housingUnitType/housingUnitType.module'
import { MediaModule } from './modules/media/media.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ReservationModule } from './modules/reservation/reservation.module'
import { ServiceModule } from './modules/service/service.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        HousingUnitTypeModule,
        CompanyModule,
        ServiceModule,

        ReservationModule,
        FacilityModule,
        MediaModule,
        BannerModule,
    ],
})
export class AppModule {}
