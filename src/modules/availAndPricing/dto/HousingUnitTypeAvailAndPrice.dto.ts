import { OmitType } from '@nestjs/swagger'

import { HousingUnitTypeResponseFullDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponseFull.dto'
import { HousingUnitTypeAvailAndPrice } from '../types/payload'

import { HousingUnitTypeAvailAndPriceSummaryDTO } from './HousingUnitTypeAvailAndPriceSummary.dtoa'

export class HousingUnitTypeAvailAndPriceDTO
    extends OmitType(HousingUnitTypeResponseFullDTO, ['facilities', 'medias'])
    implements HousingUnitTypeAvailAndPrice
{
    summary: HousingUnitTypeAvailAndPriceSummaryDTO
}
