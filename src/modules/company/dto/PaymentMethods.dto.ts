import { ApiProperty } from '@nestjs/swagger'
import { ReservationDepositType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsBoolean,
    IsDefined,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
} from 'class-validator'

import { InstallmentsTaxDTO } from './InstallmentsTax.dto'

export class PaymentMethodsDTO {
    @ApiProperty({ enum: ReservationDepositType })
    @IsDefined()
    @IsEnum(ReservationDepositType)
    guaranteeType!: ReservationDepositType

    @ApiProperty({ example: 15.5 })
    @IsDefined()
    @IsNumber()
    percentageChargedValue!: number

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    pix?: boolean

    @ApiProperty({ example: 5.0, required: false })
    @IsOptional()
    @IsNumber()
    pixDiscount?: number

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    creditCard?: boolean

    @ApiProperty({ example: 12, required: false })
    @IsOptional()
    @IsInt()
    installmentsMaxNumber?: number

    @ApiProperty({ example: 50.0, required: false })
    @IsOptional()
    @IsNumber()
    InstallmentsMinValue?: number

    @ApiProperty({ type: [InstallmentsTaxDTO], required: false })
    @IsOptional()
    @Type(() => InstallmentsTaxDTO)
    installments?: InstallmentsTaxDTO[]

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    debitCard?: boolean

    @ApiProperty({ example: 3.0, required: false })
    @IsOptional()
    @IsNumber()
    debitCardDiscount?: number

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    onHotel?: boolean

    @ApiProperty({ example: 2.5, required: false })
    @IsOptional()
    @IsNumber()
    onHotelDiscount?: number
}
