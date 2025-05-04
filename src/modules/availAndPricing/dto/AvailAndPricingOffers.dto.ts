import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'

import { AvailAndPricingOffer } from '../types'

export class AvailAndPricingOffersDTO implements AvailAndPricingOffer {
    @ApiProperty({
        description: 'Purchase start date',
        type: Date,
        format: 'date-time',
    })
    purchaseStartDate: Date

    @ApiProperty({
        description: 'Purchase end date',
        type: Date,
        format: 'date-time',
    })
    purchaseEndDate: Date

    @ApiProperty({
        description: 'Minimum number of days for the offer',
        type: Number,
        nullable: true,
    })
    minDays: number | null

    @ApiProperty({
        description: 'Maximum number of days for the offer',
        type: Number,
        nullable: true,
    })
    maxDays: number | null

    @ApiProperty({
        description: 'Minimum advance days required',
        type: Number,
        nullable: true,
    })
    minAdvanceDays: number | null

    @ApiProperty({
        description: 'Maximum advance days allowed',
        type: Number,
        nullable: true,
    })
    maxAdvanceDays: number | null

    @ApiProperty({
        description: 'Whether the offer is valid for abandoned bookings',
        type: Boolean,
    })
    validForAbandoned: boolean

    @ApiProperty({
        description: 'Whether to show the offer in highlights',
        type: Boolean,
    })
    showInHighlights: boolean

    @ApiProperty({
        description: 'Whether to show discount tag',
        type: Boolean,
    })
    showDiscountTag: boolean

    @ApiProperty({
        description: 'Whether the offer is exclusive',
        type: Boolean,
    })
    isExclusive: boolean

    @ApiProperty({
        description: 'Coupon code for the offer',
        type: String,
        nullable: true,
    })
    couponCode: string | null

    @ApiProperty({
        description: 'Offer ID',
        type: String,
    })
    id: string

    @ApiProperty({
        description: 'Company ID',
        type: String,
    })
    companyId: string

    @ApiProperty({
        description: 'Offer name',
        type: String,
    })
    name: string

    @ApiProperty({
        description: 'Valid start date',
        nullable: true,
        type: Date,
        format: 'date-time',
    })
    validStartDate: Date | null

    @ApiProperty({
        description: 'Valid end date',
        nullable: true,
        type: Date,
        format: 'date-time',
    })
    validEndDate: Date | null

    @ApiProperty({
        description: 'Price adjustment type',
        enum: PriceVariationType,
        enumName: 'PriceVariationType',
    })
    priceAdjustmentType: PriceVariationType

    @ApiProperty({
        description: 'Price adjustment value',
        type: Number,
    })
    priceAdjustmentValue: number

    @ApiProperty({
        description: 'Available week days',
        type: [Number],
    })
    availableWeekDays: number[]

    @ApiProperty({
        description: 'Whether the offer is valid for packages',
        type: Boolean,
    })
    validForPackages: boolean

    @ApiProperty({
        description: 'Offer description',
        type: String,
        nullable: true,
    })
    description: string | null

    @ApiProperty({
        description: 'Available housing unit types',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                housingUnitTypeId: { type: 'string' },
            },
        },
    })
    availableHousingUnitTypes: { housingUnitTypeId: string }[]

    @ApiProperty({
        description: 'Whether the offer is published',
        type: Boolean,
    })
    published: boolean

    @ApiProperty({
        description: 'Creation date',
        type: Date,
        format: 'date-time',
    })
    createdAt: Date

    @ApiProperty({
        description: 'Last update date',
        type: Date,
        format: 'date-time',
    })
    updatedAt: Date
}
