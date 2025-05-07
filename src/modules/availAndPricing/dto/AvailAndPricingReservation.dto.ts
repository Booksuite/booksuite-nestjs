import { OmitType } from '@nestjs/swagger'

import { ReservationResponseFullDTO } from '@/modules/reservation/dto/ReservationResponseFull.dto'
import { AvailAndPricingReservation } from '../types/payload'

export class AvailAndPricingReservationDTO
    extends OmitType(ReservationResponseFullDTO, [
        'sellerUser',
        'ageGroups',
        'services',
        'rateOption',
    ])
    implements AvailAndPricingReservation {}
