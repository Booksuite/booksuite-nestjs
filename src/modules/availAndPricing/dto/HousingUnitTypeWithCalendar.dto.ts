import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'

import { HousingUnitTypeWithCalendar } from '../types/payload'

import { AvailAndPricingHousingUnitTypeDTO } from './AvailAndPricingHousingUnitType.dto'
import { AvailAndPricingSummaryDTO } from './AvailAndPricingSummary.dto'

@ApiExtraModels(AvailAndPricingSummaryDTO)
export class HousingUnitTypeWithCalendarDTO
    implements HousingUnitTypeWithCalendar
{
    @ApiProperty({
        type: AvailAndPricingHousingUnitTypeDTO,
    })
    housingUnitType: AvailAndPricingHousingUnitTypeDTO

    @ApiProperty({
        description: 'Calendar data',
        type: 'object',
        additionalProperties: {
            $ref: getSchemaPath(AvailAndPricingSummaryDTO),
        },
    })
    calendar: Record<string, AvailAndPricingSummaryDTO>
}
