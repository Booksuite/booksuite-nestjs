import { Type } from 'class-transformer'
import {
    IsArray,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { BookingServiceCreateDTO } from './BookingServiceCreateDTO.model'

export class BookingCreateDTO {
    @IsDefined()
    @IsString()
    status!: string

    @IsDefined()
    @IsString()
    startDate!: Date

    @IsDefined()
    @IsString()
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
    @Type(() => BookingServiceCreateDTO)
    services!: BookingServiceCreateDTO
}
