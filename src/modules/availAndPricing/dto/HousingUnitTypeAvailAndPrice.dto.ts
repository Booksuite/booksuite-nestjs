import { ApiProperty, OmitType } from '@nestjs/swagger'

import { HousingUnitTypeResponseFullDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponseFull.dto'
import { HousingUnitTypeAvailAndPrice } from '../types/payload'

import { AvailAndPricingSummaryDTO } from './AvailAndPricingSummary.dto'

export class HousingUnitTypeAvailAndPriceDTO
    extends OmitType(HousingUnitTypeResponseFullDTO, ['facilities', 'medias'])
    implements HousingUnitTypeAvailAndPrice
{
    @ApiProperty({
        type: AvailAndPricingSummaryDTO,
    })
    summary: AvailAndPricingSummaryDTO
}
