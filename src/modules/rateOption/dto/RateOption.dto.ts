import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import {
    IsBoolean,
    IsDefined,
    IsEnum,
    IsNumber,
    IsString,
} from 'class-validator'

import { RateOptionAgeGroupDTO } from './RateOptionAgeGroup.dto'
import { RateOptionHousingUnitTypeDTO } from './RateOptionHousingUnitType.dto'

export class RateOptionDTO {
    @ApiProperty({ example: 'Standard Reservation', type: String })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: true, type: Boolean })
    @IsBoolean()
    @IsDefined()
    published: boolean

    @ApiProperty({
        enum: BillingType,
        enumName: 'BillingType',
        example: BillingType.DAILY,
    })
    @IsDefined()
    @IsEnum(BillingType)
    billingType!: BillingType

    @ApiProperty({ example: 20.5, type: Number })
    @IsDefined()
    @IsNumber()
    additionalAdultPrice!: number

    @ApiProperty({ example: 10.0, type: Number })
    @IsDefined()
    @IsNumber()
    additionalChildrenPrice!: number

    @ApiProperty({ example: '[0,1,2]', type: Number, isArray: true })
    @IsDefined()
    availableWeekend!: PrismaJson.WeekDays

    @ApiProperty({ type: [RateOptionHousingUnitTypeDTO] })
    @IsDefined()
    availableHousingUnitTypes!: RateOptionHousingUnitTypeDTO[]

    @ApiProperty({ type: [RateOptionAgeGroupDTO] })
    @IsDefined()
    ageGroupPrices!: RateOptionAgeGroupDTO[]

    @ApiProperty({ type: [String] })
    @IsDefined()
    includedItems!: PrismaJson.IncludedItems
}
