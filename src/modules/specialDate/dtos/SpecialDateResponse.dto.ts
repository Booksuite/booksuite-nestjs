import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'

export class SpecialDateResponseDTO {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    id!: string

    @ApiProperty({ example: 'Christmas Deal' })
    name!: string

    @ApiProperty({ example: true })
    published!: boolean

    @ApiProperty({
        type: String,
        format: 'date',
        example: '2025-12-20',
    })
    visibilityStartDate!: string

    @ApiProperty({
        type: String,
        format: 'date',
        example: '2025-12-20',
    })
    startDate!: string

    @ApiProperty({
        type: String,
        format: 'date',
        example: '2026-01-02',
    })
    endDate!: string

    @ApiProperty({ example: 2 })
    minStay!: number

    @ApiProperty({
        example: 'Special holiday discount',
        required: false,
    })
    description?: string | null

    @ApiProperty({
        example: 'General info about the offer',
        required: false,
    })
    generalDescription?: string | null

    @ApiProperty({
        type: Number,
        isArray: true,
        example: [1, 2, 3, 4, 5],
    })
    validWeekDays!: PrismaJson.WeekDays

    @ApiProperty({
        enum: PriceVariationType,
        example: PriceVariationType.ABSOLUTE_INCREASE,
        enumName: 'PriceVariationType',
    })
    priceVariationType!: PriceVariationType

    @ApiProperty({ example: 100.5 })
    priceVariationValue!: number
}
