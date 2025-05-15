import { OmitType } from '@nestjs/swagger'

import { AvailAndPricingHousingUnitType } from '@/modules/availAndPricing/types'
import { HousingUnitTypeResponseFullDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponseFull.dto'

export class AvailAndPricingHousingUnitTypeDTO
    extends OmitType(HousingUnitTypeResponseFullDTO, ['facilities', 'medias'])
    implements AvailAndPricingHousingUnitType {}
