import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsEnum,
    IsInt,
    IsOptional,
    ValidateNested,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'
import { HousingUnitTypePricingChangeDTO } from '@/common/dto/HousingUnitTypePricingChange.dto'

export class SeasonRuleUpdateDTO {
    @ApiProperty({ example: 'Summer Special', type: String, required: false })
    @IsOptional()
    name?: string

    @ApiProperty({ example: false, type: Boolean, required: false })
    @IsOptional()
    @IsBoolean()
    published: boolean

    @ApiProperty({
        example: '2025-06-01',
        type: String,
        format: 'date',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    visibilityStartDate?: string | null

    @ApiProperty({
        example: '2025-06-01',
        type: String,
        format: 'date',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startDate?: string

    @ApiProperty({
        example: '2025-08-31',
        type: String,
        format: 'date',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endDate?: string

    @ApiProperty({ example: 3, type: Number, required: false })
    @IsOptional()
    @IsInt()
    minDaily?: number

    @ApiProperty({ type: Number, isArray: true, required: false })
    @IsOptional()
    @IsWeekDays()
    validWeekDays?: PrismaJson.WeekDays

    @ApiProperty({
        enum: PriceVariationType,
        example: PriceVariationType.ABSOLUTE_INCREASE,
        enumName: 'PriceVariationType',
        required: false,
    })
    @IsOptional()
    @IsEnum(PriceVariationType)
    priceVariationType?: PriceVariationType

    @ApiProperty({ example: 20, type: Number, required: false })
    @IsOptional()
    @IsInt()
    priceVariationValue?: number

    @ApiProperty({
        type: [HousingUnitTypePricingChangeDTO],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => HousingUnitTypePricingChangeDTO)
    housingUnitTypePrices?: HousingUnitTypePricingChangeDTO[]
}
