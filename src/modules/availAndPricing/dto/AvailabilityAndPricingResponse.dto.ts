import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'

import { HousingUnitResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitResponse.dto'
import { HousingUnitTypeAvailability } from '../types'

import { CalendarDayResponseDTO } from './calendar.dto'

@ApiExtraModels(CalendarDayResponseDTO)
export class AvailabilityAndPricingResponseDTO
    implements HousingUnitTypeAvailability
{
    @ApiProperty({
        description: 'Housing unit type ID',
        example: 'unit-type-1',
    })
    id: string

    @ApiProperty({
        description: 'Housing unit type name',
        example: 'Standard Room',
    })
    name: string

    @ApiProperty({
        description: 'Weekdays price',
        example: 200,
    })
    weekdaysPrice: number

    @ApiProperty({
        description: 'Weekend price',
        example: 250,
    })
    weekendPrice: number

    @ApiProperty({
        description: 'Calendar data',
        type: 'object',
        additionalProperties: {
            $ref: getSchemaPath(CalendarDayResponseDTO),
        },
    })
    calendar: Record<string, CalendarDayResponseDTO>

    @ApiProperty({
        description: 'List of housing units',
        type: [HousingUnitResponseDTO],
    })
    housingUnits: HousingUnitResponseDTO[]
}
