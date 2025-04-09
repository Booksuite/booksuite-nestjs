import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsDefined,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

export class CreateOfferDto {
    @ApiProperty({ example: 'Summer Special', type: String })
    @IsString()
    @IsDefined()
    name: string

    @ApiProperty({
        example: 'Special summer offer with 20% discount',
        type: String,
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({ example: true, type: Boolean, required: false })
    @IsBoolean()
    @IsOptional()
    published?: boolean

    @ApiProperty({
        example: '2024-06-01',
        type: String,
        format: 'date',
    })
    @IsDateString()
    @IsDefined()
    purchaseStartDate: string

    @ApiProperty({
        example: '2024-08-31',
        type: String,
        format: 'date',
    })
    @IsDateString()
    @IsDefined()
    purchaseEndDate: string

    @ApiProperty({
        example: '2024-06-15',
        type: String,
        format: 'date',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    validStartDate?: string

    @ApiProperty({
        example: '2024-09-15',
        type: String,
        format: 'date',
        required: false,
    })
    @IsDateString()
    @IsOptional()
    validEndDate?: string

    @ApiProperty({ example: 2, type: Number, required: false })
    @IsInt()
    @IsOptional()
    minDays?: number

    @ApiProperty({ example: 7, type: Number, required: false })
    @IsInt()
    @IsOptional()
    maxDays?: number

    @ApiProperty({ example: 14, type: Number, required: false })
    @IsInt()
    @IsOptional()
    minAdvanceDays?: number

    @ApiProperty({ example: 90, type: Number, required: false })
    @IsInt()
    @IsOptional()
    maxAdvanceDays?: number

    @ApiProperty({ example: true, type: Boolean, required: false })
    @IsBoolean()
    @IsOptional()
    validForAbandoned?: boolean

    @ApiProperty({ example: true, type: Boolean, required: false })
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
    availableHousingUnitTypes: string[]

    @ApiProperty({
        example: ['550e8400-e29b-41d4-a716-446655440000'],
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    validPaymentMethods: string[]

    @ApiProperty({ example: [1, 2, 3, 4, 5], type: [Number], required: false })
    @IsOptional()
    @IsWeekDays()
    availableWeekDays: number[]

    @ApiProperty({ example: ['BREAKFAST', 'PARKING'], type: [String] })
    @IsArray()
    @IsString({ each: true })
    validServices: string[]

    @ApiProperty({
        example: PriceVariationType.PERCENTAGE_REDUCTION,
        enumName: 'PriceVariationType',
        enum: PriceVariationType,
    })
    @IsEnum(PriceVariationType)
    @IsDefined()
    priceAdjustmentType: PriceVariationType

    @ApiProperty({ example: 20, type: Number })
    @IsNumber()
    @IsDefined()
    priceAdjustmentValue: number

    @ApiProperty({ example: true, type: Boolean, required: false })
    @IsBoolean()
    @IsOptional()
    showInHighlights?: boolean

    @ApiProperty({ example: true, type: Boolean, required: false })
    @IsBoolean()
    @IsOptional()
    showDiscountTag?: boolean

    @ApiProperty({ example: true, type: Boolean, required: false })
    @IsBoolean()
    @IsOptional()
    isExclusive?: boolean

    @ApiProperty({ example: 'SUMMER20', type: String, required: false })
    @IsString()
    @IsOptional()
    couponCode?: string
}
