import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'
import { Type } from 'class-transformer'
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
    ValidateNested,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'
import { HousingUnitTypePricingChangeDTO } from '@/common/dto/HousingUnitTypePricingChange.dto'

export class SeasonRuleCreateDTO {
    @ApiProperty({ example: 'Summer Special', type: String })
    @IsDefined()
    @IsString()
    name: string

    @ApiProperty({ example: 'false', type: Boolean })
    @IsDefined()
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
    })
    @IsDefined()
    @IsDateString()
    startDate: string

    @ApiProperty({
        example: '2025-08-31',
        type: String,
        format: 'date',
    })
    @IsDefined()
    @IsDateString()
    endDate: string

    @ApiProperty({ example: 3, type: Number })
    @IsDefined()
    @IsInt()
    minStay: number

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    validWeekDays: PrismaJson.WeekDays

    @ApiProperty({
        enum: PriceVariationType,
        example: PriceVariationType.ABSOLUTE_INCREASE,
        enumName: 'PriceVariationType',
    })
    @IsDefined()
    @IsEnum(PriceVariationType)
    priceVariationType: PriceVariationType

    @ApiProperty({ example: 20, type: Number })
    @IsDefined()
    @IsNumber()
    priceVariationValue: number

    @ApiProperty({ type: [HousingUnitTypePricingChangeDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => HousingUnitTypePricingChangeDTO)
    housingUnitTypePrices: HousingUnitTypePricingChangeDTO[]
}
