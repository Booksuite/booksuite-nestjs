import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BookModule } from './modules/booking/booking.module'
import { CompanyModule } from './modules/company/company.module'
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
        BookModule,
        ServiceModule,
        HousingUnitModule,
    ],
})
export class AppModule {}
