import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationTypes } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDateString,
    IsDefined,
    IsEnum,
    IsInt,
    IsString,
    ValidateNested,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

import { SeasonRuleHousingUnitTypeCreateDTO } from './SeasonRulesHousingUnitType.dto'

export class SeasonRulesDTO {
    @ApiProperty({ example: 'Summer Special', type: String })
    @IsDefined()
    @IsString()
    name: string

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
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ enum: PriceVariationTypes })
    @IsDefined()
    @IsEnum(PriceVariationTypes)
    priceVariationType: PriceVariationTypes

    @ApiProperty({ example: 20, type: Number })
    @IsDefined()
    @IsInt()
    price: number

    @ApiProperty({ type: [SeasonRuleHousingUnitTypeCreateDTO] })
    @IsDefined()
    @IsArray()
    @ValidateNested()
    @Type(() => SeasonRuleHousingUnitTypeCreateDTO)
    housingUnitTypesPrices: SeasonRuleHousingUnitTypeCreateDTO[]
}
