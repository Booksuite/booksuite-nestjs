import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDefined,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
} from 'class-validator'

import { ReservationServiceCreateDTO } from './ReservationServiceCreate.dto.model'

export class ReservationCreateDTO {
    @IsDefined()
    @IsString()
    status!: string

    @ApiProperty({ example: '2025-01-14T13:19:15.271598Z' })
    @IsDefined()
    @IsISO8601()
    startDate!: Date

    @ApiProperty({ example: '2024-10-10T13:19:15.271627Z' })
    @IsDefined()
    @IsISO8601()
    endDate!: Date

    @ApiProperty({ example: '7' })
    @IsOptional()
    @IsInt()
    totalDays?: number

    @ApiProperty({ example: '2' })
    @IsDefined()
    @IsInt()
    adults!: number

    @ApiProperty({ example: '1' })
    @IsDefined()
    @IsInt()
    children!: number

    @ApiProperty({ example: 'Online' })
    @IsDefined()
    @IsString()
    saleChannel!: string

    @ApiProperty({ example: 'Featured booking' })
    @IsDefined()
    @IsString()
    notes!: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsString()
    housingUnitId!: string

    @ApiProperty({ type: ReservationServiceCreateDTO })
    @IsDefined()
    @IsArray()
    @Type(() => ReservationServiceCreateDTO)
    services!: ReservationServiceCreateDTO
}
