import { OmitType } from '@nestjs/swagger'

import { ReservationServiceDTO } from '@/modules/reservation/dto/ReservationService.dto'

export class AvailAndPricingServiceDTO extends OmitType(ReservationServiceDTO, [
    'totalPrice',
]) {}
