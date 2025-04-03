import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import {
    IsDefined,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

import { ReservationOptionAgeGroupDTO } from './ReservationOptionAgeGroup.dto'
import { ReservationOptionHousingUnitTypeDTO } from './ReservationOptionHousingUnitType.dto'

export class ReservationOptionUpdateDTO {
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
        type: [ReservationOptionHousingUnitTypeDTO],
        required: false,
    })
    @IsOptional()
    availableHousingUnitTypes?: ReservationOptionHousingUnitTypeDTO[]

    @ApiProperty({
        type: [ReservationOptionAgeGroupDTO],
        required: false,
    })
    @IsOptional()
    ageGroupPrices?: ReservationOptionAgeGroupDTO[]

    @ApiProperty({ type: [String], required: false })
    @IsOptional()
    includedItems?: PrismaJson.IncludedItems
}
