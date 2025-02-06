import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { BookModule } from './modules/book/book.module'
import { CompanyModule } from './modules/company/company.module'
import { ExperienceModule } from './modules/experience/experience.module'
import { PropertyModule } from './modules/property/property.module'
import { RoomsModule } from './modules/rooms/rooms.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        RoomsModule,
        PropertyModule,
        CompanyModule,
        BookModule,
        ExperienceModule,
    ],
})
export class AppModule {}
