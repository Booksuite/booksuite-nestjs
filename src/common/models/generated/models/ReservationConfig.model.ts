import { IsDate, IsDefined, IsIn, IsOptional, IsString } from 'class-validator'

import { ReservationDepositType } from '../enums'
import { getEnumValues } from '../helpers'

import { Company } from './'

export class ReservationConfig {
    @IsDefined()
    @IsString()
    id!: string

    @IsOptional()
    tax?: number

    @IsDefined()
    @IsIn(getEnumValues(ReservationDepositType))
    reservationDepositType!: ReservationDepositType

    @IsOptional()
    reservationDepositTypeValue?: number

    @IsDefined()
    @IsString()
    companyId!: string

    @IsDefined()
    company!: Company

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
