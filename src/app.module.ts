import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { Booking } from './common/models/generated/models'
import { CompanyModule } from './modules/company/company.module'
import { FacilityModule } from './modules/facility/facility.module'
import { HousingUnitModule } from './modules/housingUnit/housingUnit.module'
import { HousingUnitTypeModule } from './modules/housingUnitType/housingUnitType.module'
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
        FacilityModule,
        Booking,
    ],
})
export class AppModule {}
