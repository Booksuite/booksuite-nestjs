import { Module } from '@nestjs/common'

import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'

@Module({
    providers: [ReservationService],
    controllers: [ReservationController],
})
export class ReservationModule {}
