import { OmitType } from '@nestjs/swagger'

import { ReservationServiceDTO } from '@/modules/reservation/dto/ReservationService.dto'

export class AvailAndPricingSearchServiceDTO extends OmitType(
    ReservationServiceDTO,
    ['totalPrice'],
) {}
