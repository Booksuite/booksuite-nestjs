import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

import { UNAVAILABLE_REASON_MESSAGE } from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { HousingUnitTypeAvailability } from '../types'

export class AvailabilityDTO implements HousingUnitTypeAvailability {
    @ApiProperty({
        description: 'Availability',
        example: true,
    })
    @IsBoolean()
    available: boolean

    @ApiProperty({
        enum: UnavailableSource,
        enumName: 'UnavailableSource',
        description: 'Unavailability source',
        example: UnavailableSource.SEASON_RULES,
        nullable: true,
    })
    unavailabilitySource: UnavailableSource | null

    @ApiProperty({
        enum: UnavailabilityReason,
        enumName: 'UnavailabilityReason',
        description: 'Unavailability reason',
        example: UnavailabilityReason.ALL_ROOMS_OCCUPIED,
        nullable: true,
    })
    unavailableReason: UnavailabilityReason | null

    @ApiProperty({
        description: 'Unavailability reason message',
        example:
            UNAVAILABLE_REASON_MESSAGE[UnavailabilityReason.ALL_ROOMS_OCCUPIED],
        nullable: true,
    })
    unavailableReasonMessage: string | null
}
