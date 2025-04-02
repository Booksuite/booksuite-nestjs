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
    IsString,
    ValidateNested,
} from 'class-validator'

import { IsWeekDays } from '@/common/decorators/IsWeekDays.decorator'

import { SeasonRuleHousingUnitTypeCreateDTO } from './SeasonRuleHousingUnitType.dto'

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
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({
        enum: PriceVariationType,
        example: PriceVariationType.ABSOLUTE_INCREASE,
        enumName: 'priceVariationType',
    })
    @IsDefined()
    @IsEnum(PriceVariationType)
    priceVariationType: PriceVariationType

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
