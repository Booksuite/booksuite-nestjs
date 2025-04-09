import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

import { SpecialDateHousingUnitTypeDTO } from './SpecialDateHousingUnitType.dto'
import { SpecialDateServiceDTO } from './SpecialDateService.dto'
import { SpecialDateMediaDTO } from './SpecialDatesMedias.dto'

export class SpecialDateUpdateDTO {
    @ApiProperty({ example: 'Christmas Deal', type: String, required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: false, type: Boolean, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({ example: '2025-12-20', type: String, required: false })
    @IsOptional()
    @IsDateString()
    startDate?: string

    @ApiProperty({ example: '2026-01-02', type: Date, required: false })
    @IsOptional()
    @IsDateString()
    endDate?: Date

    @ApiProperty({ example: 2, type: Number, required: false })
    @IsOptional()
    @IsInt()
    minDaily?: number

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

    @ApiProperty({ type: Number, isArray: true, required: false })
    @IsOptional()
    @IsWeekDays()
    availableWeekDays?: PrismaJson.WeekDays

    @ApiProperty({
        enum: PriceVariationType,
        example: PriceVariationType.ABSOLUTE_INCREASE,
        enumName: 'PriceVariationType',
        required: false,
    })
    @IsOptional()
    @IsEnum(PriceVariationType)
    priceVariationType?: PriceVariationType

    @ApiProperty({ example: 100.5, type: Number, required: false })
    @IsOptional()
    @IsNumber()
    price?: number

    @ApiProperty({ type: [SpecialDateHousingUnitTypeDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => SpecialDateHousingUnitTypeDTO)
    housingUnitTypePrices?: SpecialDateHousingUnitTypeDTO[]

    @ApiProperty({ type: [SpecialDateServiceDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => SpecialDateServiceDTO)
    includedServices?: SpecialDateServiceDTO[]

    @ApiProperty({ type: [SpecialDateMediaDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => SpecialDateMediaDTO)
    medias?: SpecialDateMediaDTO[]
}
