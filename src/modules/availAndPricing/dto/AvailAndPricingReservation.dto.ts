import { OmitType } from '@nestjs/swagger'

import { ReservationResponseFullDTO } from '@/modules/reservation/dto/ReservationResponseFull.dto'
import { AvailAndPricingReservation } from '../types'

export class AvailAndPricingReservationDTO
    extends OmitType(ReservationResponseFullDTO, [
        'sellerUser',
        'ageGroups',
        'services',
        'rateOption',
        'summary',
    ])
    implements AvailAndPricingReservation {}
