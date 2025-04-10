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
    IsString,
    ValidateNested,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

import { SeasonRuleHousingUnitTypePriceDTO } from './SeasonRuleHousingUnitTypePrice.dto'

export class SeasonRuleDTO {
    @ApiProperty({ example: 'Summer Special', type: String })
    @IsDefined()
    @IsString()
    name: string

    @ApiProperty({ example: 'false', type: Boolean })
    @IsDefined()
    @IsBoolean()
    published: boolean

    @ApiProperty({ example: '2025-06-01', type: String })
    @IsDefined()
    @IsDateString()
    startDate: string

    @ApiProperty({ example: '2025-08-31', type: String })
    @IsDefined()
    @IsDateString()
    endDate: string

    @ApiProperty({ example: 3, type: Number })
    @IsDefined()
    @IsInt()
    minDaily: number

    @ApiProperty({ type: Number, isArray: true })
    @IsDefined()
    @IsWeekDays()
    availableWeekDays: PrismaJson.WeekDays

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
    price: number

    @ApiProperty({ type: [SeasonRuleHousingUnitTypePriceDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => SeasonRuleHousingUnitTypePriceDTO)
    housingUnitTypePrices: SeasonRuleHousingUnitTypePriceDTO[]
}
