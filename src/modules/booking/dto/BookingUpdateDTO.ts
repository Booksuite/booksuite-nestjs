import { Type } from 'class-transformer'
import {
    IsArray,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { BookingServiceUpdateDTO } from './BookingServiceUpdateDTO'

export class BookingUpdateDTO {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    status!: string

    @IsDefined()
    @IsDate()
    startDate!: Date

    @IsDefined()
    @IsDate()
    endDate!: Date

    @IsOptional()
    @IsInt()
    totalDays?: number

    @IsDefined()
    @IsInt()
    adults!: number

    @IsDefined()
    @IsInt()
    children!: number

    @IsDefined()
    @IsString()
    saleChannel!: string

    @IsDefined()
    @IsString()
    notes!: string

    @IsDefined()
    @IsString()
    housingUnitId!: string

    @IsDefined()
    @IsArray()
    @Type(() => BookingServiceUpdateDTO)
    services!: BookingServiceUpdateDTO
}
