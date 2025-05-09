import { OmitType } from '@nestjs/swagger'

import { ServiceResponseFullDTO } from '@/modules/service/dtos/ServiceResponseFull.dto'
import { AvailAndPricingService } from '../types'

export class AvailAndPricingServiceDTO
    extends OmitType(ServiceResponseFullDTO, ['medias'])
    implements AvailAndPricingService {}
