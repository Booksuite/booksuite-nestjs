import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator'

import { ReservationDepositType } from '../enums/ReservationDepositType.enum'

export class ReservationConfigCreateDTO {
    @IsOptional()
    tax?: number

    @IsDefined()
    @IsEnum(ReservationDepositType)
    reservationDepositType!: ReservationDepositType

    @IsOptional()
    reservationDepositTypeValue?: number

    @IsDefined()
    @IsString()
    companyId!: string
}
