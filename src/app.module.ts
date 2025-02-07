import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BookModule } from './modules/book/book.module'
import { CompanyModule } from './modules/company/company.module'
import { ExperienceModule } from './modules/experience/experience.module'
import { GuestController } from './modules/guest/guest.controller'
import { GuestModule } from './modules/guest/guest.module'
import { GuestService } from './modules/guest/guest.service'
import { PrismaModule } from './modules/prisma/prisma.module'
import { PropertyModule } from './modules/property/property.module'
import { RoomsModule } from './modules/rooms/rooms.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        RoomsModule,
        PrismaModule,
        PropertyModule,
        CompanyModule,
        BookModule,
        ExperienceModule,
        GuestModule,
    ],
    providers: [GuestService],
    controllers: [GuestController],
})
export class AppModule {}
