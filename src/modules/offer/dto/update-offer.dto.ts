import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

export class UpdateOfferDto {
    @ApiProperty({ example: 'Summer Special', type: String, required: false })
    @IsString()
    @IsOptional()
    name?: string

    @ApiProperty({
        example: 'Special summer offer with 20% discount',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string | null

    @ApiProperty({
        example: true,
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    published?: boolean

    @ApiProperty({
        example: '2024-06-01',
        type: String,
        format: 'date',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    purchaseStartDate?: string

    @ApiProperty({
        example: '2024-08-31',
        type: String,
        format: 'date',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    purchaseEndDate?: string

    @ApiProperty({
        example: '2024-06-15',
        type: String,
        format: 'date',
        required: false,
        nullable: true,
    })
    @IsDateString()
    @IsOptional()
    validStartDate?: string | null

    @ApiProperty({
        example: '2024-09-15',
        type: String,
        format: 'date',
        required: false,
        nullable: true,
    })
    @IsDateString()
    @IsOptional()
    validEndDate?: string | null

    @ApiProperty({ example: 2, type: Number, required: false, nullable: true })
    @IsInt()
    @IsOptional()
    minDays?: number | null

    @ApiProperty({ example: 7, type: Number, required: false, nullable: true })
    @IsInt()
    @IsOptional()
    maxDays?: number | null

    @ApiProperty({ example: 14, type: Number, required: false, nullable: true })
    @IsInt()
    @IsOptional()
    minAdvanceDays?: number | null

    @ApiProperty({ example: 90, type: Number, required: false, nullable: true })
    @IsInt()
    @IsOptional()
    maxAdvanceDays?: number | null

    @ApiProperty({
        example: true,
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    validForAbandoned?: boolean

    @ApiProperty({
        example: true,
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    validForPackages?: boolean

    @ApiProperty({
        example: ['550e8400-e29b-41d4-a716-446655440000'],
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    availableHousingUnitTypes?: string[]

    @ApiProperty({
        example: ['550e8400-e29b-41d4-a716-446655440000'],
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    validPaymentMethods?: string[]

    @ApiProperty({ example: [1, 2, 3, 4, 5], type: [Number], required: false })
    @IsOptional()
    @IsWeekDays()
    availableWeekDays?: number[]

    @ApiProperty({
        example: ['BREAKFAST', 'PARKING'],
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    validServices?: string[]

    @ApiProperty({
        example: PriceVariationType.PERCENTAGE_INCREASE,
        enum: PriceVariationType,
        enumName: 'PriceVariationType',
        required: false,
    })
    @IsEnum(PriceVariationType)
    @IsOptional()
    priceAdjustmentType?: PriceVariationType

    @ApiProperty({ example: 20, type: Number, required: false })
    @IsNumber()
    @IsOptional()
    priceAdjustmentValue?: number

    @ApiProperty({
        example: true,
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    showInHighlights?: boolean

    @ApiProperty({
        example: true,
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    showDiscountTag?: boolean

    @ApiProperty({
        example: true,
        type: Boolean,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    isExclusive?: boolean

    @ApiProperty({
        example: 'SUMMER20',
        type: String,
        required: false,
        nullable: true,
    })
    @IsString()
    @IsOptional()
    couponCode?: string | null
}
