import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator'

import { AgeGroupPriceDTO } from './AdditionalAgeGroupsPrices.dto'
import { ReservationOptionHousingUnitTypeDTO } from './ReservationOptionHousingUnitType.dto'

export class ReservationOptionDTO {
    @ApiProperty({ example: 'Standard Reservation', type: String })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ enum: BillingType, example: BillingType.DAILY })
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

    @ApiProperty({ type: [String], example: '[Café, Almoço]' })
    @IsDefined()
    availableWeekend!: PrismaJson.WeekDays

    @ApiProperty({ type: [ReservationOptionHousingUnitTypeDTO] })
    @IsDefined()
    availableHousingUnitTypes!: ReservationOptionHousingUnitTypeDTO[]

    @ApiProperty({ type: [AgeGroupPriceDTO] })
    @IsDefined()
    additionalAgeGroupPrice!: AgeGroupPriceDTO[]

    @ApiProperty({ type: [String] })
    @IsDefined()
    includedItems!: PrismaJson.includedItems
}
