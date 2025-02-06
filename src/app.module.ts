import { Module } from '@nestjs/common'

import { CompanyModule } from './modules/company/company.module'
import { RoomsModule } from './modules/rooms/rooms.module'

@Module({
    imports: [RoomsModule, CompanyModule],
})
export class AppModule {}
