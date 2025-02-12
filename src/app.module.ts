import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BookModule } from './modules/book/book.module'
import { CompanyModule } from './modules/company/company.module'
import { HousingUnitTypeModule } from './modules/housingUnitType/housingUnitType.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import { RoomsModule } from './modules/rooms/rooms.module'
import { ServiceModule } from './modules/service/service.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        RoomsModule,
        PrismaModule,
        HousingUnitTypeModule,
        CompanyModule,
        BookModule,
        ServiceModule,
    ],
})
export class AppModule {}
