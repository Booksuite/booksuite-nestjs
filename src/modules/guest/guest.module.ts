import { Module } from '@nestjs/common'

import { GuestController } from './guest.controller'
import { GuestService } from './guest.service'

@Module({
    providers: [GuestService],
    controllers: [GuestController],
})
export class GuestModule {}
