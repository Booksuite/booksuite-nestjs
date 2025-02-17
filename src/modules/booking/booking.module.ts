import { Module } from '@nestjs/common'

import { BookingController } from './booking.controller'
import { BookingService } from './booking.service'
import { BookingpolicyController } from './bookingPolicy/bookingPolicy.controller'
import { BookingPolicyService } from './bookingPolicy/bookingPolicy.service'

@Module({
    providers: [BookingService, BookingPolicyService],
    controllers: [BookingController, BookingpolicyController],
})
export class BookingModule {}
