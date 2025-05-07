import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'

import { HousingUnitTypePricingChangeDTO } from '@/common/dto/HousingUnitTypePricingChange.dto'
import { AvailAndPricingSpecialDates } from '../types'

export class AvailAndPricingSpecialDatesDTO
    implements AvailAndPricingSpecialDates
{
    @ApiProperty({
        description: 'Special date rule ID',
        type: String,
    })
    id: string

    @ApiProperty({
        description: 'Company ID',
        type: String,
    })
    companyId: string

    @ApiProperty({
        description: 'Special date rule name',
        type: String,
    })
    name: string

    @ApiProperty({
        description: 'Start date of the special date period',
        type: Date,
        format: 'date-time',
    })
    startDate: Date

    @ApiProperty({
        description: 'End date of the special date period',
        type: Date,
        format: 'date-time',
    })
    endDate: Date

    @ApiProperty({
        description: 'Visibility start date',
        type: Date,
        format: 'date-time',
    })
    visibilityStartDate: Date

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
        description: 'Whether the special date rule is published',
        type: Boolean,
    })
    published: boolean

    @ApiProperty({
        description: 'Available week days',
        type: 'array',
        items: { type: 'number' },
    })
    validWeekDays: number[]

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

    @ApiProperty({
        description: 'Special date description',
        type: String,
        nullable: true,
    })
    description: string | null

    @ApiProperty({
        description: 'General description',
        type: String,
        nullable: true,
    })
    generalDescription: string | null
}
