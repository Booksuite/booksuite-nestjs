import { Prisma } from '@prisma/client'
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { Property } from './'

export class PaymentConfig {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    applicableTax?: number

    @IsOptional()
    @IsString()
    guarantee?: string

    @IsOptional()
    guaranteePercentage?: number

    @IsOptional()
    @IsBoolean()
    pix?: boolean

    @IsOptional()
    pixDiscount?: number

    @IsOptional()
    @IsBoolean()
    creditCard?: boolean

    @IsDefined()
    @IsInt()
    maxInstallments!: number

    @IsOptional()
    @IsInt()
    minInstallments?: number

    @IsOptional()
    @IsBoolean()
    creditCardTax?: boolean

    @IsOptional()
    installmentsTax?: Prisma.JsonValue

    @IsOptional()
    @IsBoolean()
    debitCard?: boolean

    @IsOptional()
    debitCardDiscount?: number

    @IsOptional()
    @IsBoolean()
    inCash?: boolean

    @IsOptional()
    inCashDiscount?: number

    @IsDefined()
    @IsInt()
    propertyId!: number

    @IsDefined()
    property!: Property

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
