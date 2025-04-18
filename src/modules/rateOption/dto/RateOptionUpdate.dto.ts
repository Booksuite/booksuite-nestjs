import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import {
    IsDefined,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

import { RateOptionAgeGroupDTO } from './RateOptionAgeGroup.dto'
import { RateOptionHousingUnitTypeDTO } from './RateOptionHousingUnitType.dto'

export class RateOptionUpdateDTO {
    @ApiProperty({
        example: 'Standard Reservation',
        type: String,
        required: false,
    })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, type: Boolean, required: false })
    @IsOptional()
    @IsDefined()
    published?: boolean

    @ApiProperty({
        enum: BillingType,
        enumName: 'BillingType',
        example: BillingType.DAILY,
        required: false,
    })
    @IsOptional()
    @IsEnum(BillingType)
    billingType?: BillingType

    @ApiProperty({ example: 20.5, type: Number, required: false })
    @IsOptional()
    @IsNumber()
    additionalAdultPrice?: number

    @ApiProperty({ example: 10.0, type: Number, required: false })
    @IsOptional()
    @IsNumber()
    additionalChildrenPrice?: number

    @ApiProperty({
        example: '[0,1,2]',
        type: Number,
        isArray: true,
        required: false,
    })
    @IsOptional()
    availableWeekend?: PrismaJson.WeekDays

    @ApiProperty({
        type: [RateOptionHousingUnitTypeDTO],
        required: false,
    })
    @IsOptional()
    availableHousingUnitTypes?: RateOptionHousingUnitTypeDTO[]

    @ApiProperty({
        type: [RateOptionAgeGroupDTO],
        required: false,
    })
    @IsOptional()
    ageGroupPrices?: RateOptionAgeGroupDTO[]

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    includedItems?: PrismaJson.IncludedItems
}
