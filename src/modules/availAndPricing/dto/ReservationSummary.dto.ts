import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitResponse.dto'
import { ReservationSummary } from '../types/payload'

import { AvailAndPricingHousingUnitTypeDTO } from './AvailAndPricingHousingUnitType.dto'
import { AvailAndPricingSummaryDTO } from './AvailAndPricingSummary.dto'

export class ReservationSummaryDTO implements ReservationSummary {
    @ApiProperty({
        type: AvailAndPricingHousingUnitTypeDTO,
    })
    housingUnitType: AvailAndPricingHousingUnitTypeDTO

    @ApiProperty({
        description: 'Housing unit for the day',
        type: HousingUnitResponseDTO,
        nullable: true,
    })
    housingUnit: HousingUnitResponseDTO | null

    @ApiProperty({
        type: AvailAndPricingSummaryDTO,
    })
    summary: AvailAndPricingSummaryDTO
}
