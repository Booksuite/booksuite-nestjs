import { RateOptionResponseDTO } from '@/modules/rateOption/dto/RateOptionResponse.dto'
import { AvailAndPricingRateOption } from '../types'

import { AvailAndPricingRateOptionAgeGroupDTO } from './AvailAndPricingRateOptionAgeGroup.dto'

export class AvailAndPricingRateOptionDTO
    extends RateOptionResponseDTO
    implements AvailAndPricingRateOption
{
    ageGroupPrices: AvailAndPricingRateOptionAgeGroupDTO[]
}
