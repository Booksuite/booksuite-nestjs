import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'

export class OfferResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ example: 'Summer Special' })
    name: string

    @ApiProperty({
        example: 'Special summer offer with 20% discount',
        type: String,
        nullable: true,
    })
    description: string | null

    @ApiProperty({ example: true, type: Boolean })
    published: boolean

    @ApiProperty({ example: '2024-06-01T00:00:00.000Z' })
    purchaseStartDate: Date

    @ApiProperty({ example: '2024-08-31T00:00:00.000Z' })
    purchaseEndDate: Date

    @ApiProperty({ example: '2024-06-15T00:00:00.000Z', nullable: true })
    validStartDate: Date | null

    @ApiProperty({ example: '2024-09-15T00:00:00.000Z', nullable: true })
    validEndDate: Date | null

    @ApiProperty({ example: 2, type: Number, nullable: true })
    minDays: number | null

    @ApiProperty({ example: 7, type: Number, nullable: true })
    maxDays: number | null

    @ApiProperty({ example: 14, type: Number, nullable: true })
    minAdvanceDays: number | null

    @ApiProperty({ example: 90, type: Number, nullable: true })
    maxAdvanceDays: number | null

    @ApiProperty({ example: true, type: Boolean })
    validForAbandoned: boolean

    @ApiProperty({ example: true, type: Boolean })
    validForPackages: boolean

    @ApiProperty({ example: [1, 2, 3, 4, 5], type: [Number] })
    availableWeekDays: number[]

    @ApiProperty({ example: 'PERCENTAGE', enum: PriceVariationType })
    priceAdjustmentType: PriceVariationType

    @ApiProperty({ example: 20, type: Number })
    priceAdjustmentValue: number

    @ApiProperty({ example: true, type: Boolean })
    showInHighlights: boolean

    @ApiProperty({ example: true, type: Boolean })
    showDiscountTag: boolean

    @ApiProperty({ example: true, type: Boolean })
    isExclusive: boolean

    @ApiProperty({ example: 'SUMMER20', type: String, nullable: true })
    couponCode: string | null

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    companyId: string

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    createdAt: Date

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    updatedAt: Date
}
