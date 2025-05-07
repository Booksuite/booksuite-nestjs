import {
    ApiExtraModels,
    ApiProperty,
    getSchemaPath,
    OmitType,
} from '@nestjs/swagger'

import { HousingUnitTypeResponseFullDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponseFull.dto'
import { HousingUnitTypeWithCalendar } from '../types/payload'

import { CalendarDayResponseDTO } from './calendar.dto'

@ApiExtraModels(CalendarDayResponseDTO)
export class HousingUnitTypeWithCalendarDTO
    extends OmitType(HousingUnitTypeResponseFullDTO, ['facilities', 'medias'])
    implements HousingUnitTypeWithCalendar
{
    @ApiProperty({
        description: 'Calendar data',
        type: 'object',
        additionalProperties: {
            $ref: getSchemaPath(CalendarDayResponseDTO),
        },
    })
    calendar: Record<string, CalendarDayResponseDTO>
}
