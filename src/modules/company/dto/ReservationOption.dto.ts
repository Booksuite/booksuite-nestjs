import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import {
    IsBoolean,
    IsDefined,
    IsEnum,
    IsNumber,
    IsString,
} from 'class-validator'

import { AddiotionalAgeGroupPriceDTO } from './AdditionalAgeGroupsPrice.dto'
import { ReservationOptionHousingUnitTypeDTO } from './ReservationOptionHousingUnitType.dto'

export class ReservationOptionDTO {
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

    @ApiProperty({ type: [ReservationOptionHousingUnitTypeDTO] })
    @IsDefined()
    availableHousingUnitTypes!: ReservationOptionHousingUnitTypeDTO[]

    @ApiProperty({ type: [AddiotionalAgeGroupPriceDTO] })
    @IsDefined()
    additionalAgeGroupPrice!: PrismaJson.AdditionalAgeGroupsPrices

    @ApiProperty({ type: [String] })
    @IsDefined()
    includedItems!: PrismaJson.IncludedItems
}
