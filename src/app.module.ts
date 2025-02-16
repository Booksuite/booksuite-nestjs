import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BookingModule } from './modules/booking/booking.module'
import { CompanyModule } from './modules/company/company.module'
import { FacilityModule } from './modules/facility/facility.module'
import { HousingUnitModule } from './modules/housingUnit/housingUnit.module'
import { HousingUnitTypeModule } from './modules/housingUnitType/housingUnitType.module'
import { MediaModule } from './modules/media/media.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { ServiceModule } from './modules/service/service.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        HousingUnitTypeModule,
        CompanyModule,
        ServiceModule,
        HousingUnitModule,
        BookingModule,
        FacilityModule,
        MediaModule,
    ],
})
export class AppModule {}
