import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'

import { HousingUnitTypePricingChangeDTO } from '@/common/dto/HousingUnitTypePricingChange.dto'
import { AvailAndPricingSeasonRules } from '../types'

export class AvailAndPricingSeasonRulesDTO
    implements AvailAndPricingSeasonRules
{
    @ApiProperty({
        description: 'Season rule ID',
        type: String,
    })
    id: string

    @ApiProperty({
        description: 'Company ID',
        type: String,
    })
    companyId: string

    @ApiProperty({
        description: 'Season rule name',
        type: String,
    })
    name: string

    @ApiProperty({
        description: 'Start date of the season',
        type: Date,
        format: 'date-time',
    })
    startDate: Date

    @ApiProperty({
        description: 'End date of the season',
        type: Date,
        format: 'date-time',
    })
    endDate: Date

    @ApiProperty({
        description: 'Minimum daily price',
        type: Number,
    })
    minStay: number

    @ApiProperty({
        description: 'Price variation type',
        enum: PriceVariationType,
        enumName: 'PriceVariationType',
    })
    priceVariationType: PriceVariationType

    @ApiProperty({
        description: 'Price value',
        type: Number,
    })
    priceVariationValue: number

    @ApiProperty({
        description: 'Whether the season rule is published',
        type: Boolean,
    })
    published: boolean

    @ApiProperty({
        description: 'Visibility start date',
        type: Date,
        format: 'date-time',
        nullable: true,
    })
    visibilityStartDate: Date | null

    @ApiProperty({
        description: 'Available week days',
        type: 'array',
        items: { type: 'number' },
    })
    validWeekDays: PrismaJson.WeekDays

    @ApiProperty({
        description: 'Housing unit type prices',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                housingUnitTypeId: { type: 'string' },
            },
        },
    })
    housingUnitTypePrices: HousingUnitTypePricingChangeDTO[]
}
