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

import { SpecialDateServiceDTO } from './SpecialDateService.dto'
import { SpecialDateMediaDTO } from './SpecialDatesMedias.dto'

export class SpecialDateCreateDTO {
    @ApiProperty({ example: 'Christmas Deal', type: String })
    @IsDefined()
    @IsString()
    name: string

    @ApiProperty({ example: false, type: Boolean })
    @IsDefined()
    @IsBoolean()
    published: boolean

    @ApiProperty({
        example: '2025-12-20',
        type: String,
        format: 'date',
    })
    @IsDefined()
    @IsDateString()
    visibilityStartDate: string

    @ApiProperty({
        example: '2025-12-20',
        type: String,
        format: 'date',
    })
    @IsDefined()
    @IsDateString()
    startDate: string

    @ApiProperty({
        example: '2026-01-02',
        type: Date,
        format: 'date',
    })
    @IsDefined()
    @IsDateString()
    endDate: string

    @ApiProperty({ example: 2, type: Number })
    @IsDefined()
    @IsInt()
    minStay: number

    @ApiProperty({
        example: 'Special holiday discount',
        type: String,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    description?: string | null

    @ApiProperty({
        example: 'General info about the offer',
        type: String,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    generalDescription?: string | null

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

    @ApiProperty({ example: 100.5, type: Number })
    @IsDefined()
    @IsNumber()
    priceVariationValue: number

    @ApiProperty({ type: [HousingUnitTypePricingChangeDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => HousingUnitTypePricingChangeDTO)
    housingUnitTypePrices: HousingUnitTypePricingChangeDTO[]

    @ApiProperty({ type: [SpecialDateServiceDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => SpecialDateServiceDTO)
    includedServices: SpecialDateServiceDTO[]

    @ApiProperty({ type: [SpecialDateMediaDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => SpecialDateMediaDTO)
    medias: SpecialDateMediaDTO[]
}
