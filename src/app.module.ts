import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AddressController } from './modules/address/address.controller'
import { AddressModule } from './modules/address/address.module'
import { AddressService } from './modules/address/address.service'
import { BookModule } from './modules/book/book.module'
import { CategoryController } from './modules/category/category.controller'
import { CategoryModule } from './modules/category/category.module'
import { CategoryService } from './modules/category/category.service'
import { CompanyModule } from './modules/company/company.module'
import { ExperienceModule } from './modules/experience/experience.module'
import { GuestController } from './modules/guest/guest.controller'
import { GuestModule } from './modules/guest/guest.module'
import { GuestService } from './modules/guest/guest.service'
import { PolicyController } from './modules/policy/policy.controller'
import { PolicyModule } from './modules/policy/policy.module'
import { PolicyService } from './modules/policy/policy.service'
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
        AddressModule,
        CategoryModule,
        PolicyModule,
    ],
    providers: [GuestService, AddressService, CategoryService, PolicyService],
    controllers: [
        GuestController,
        AddressController,
        CategoryController,
        PolicyController,
    ],
})
export class AppModule {}
