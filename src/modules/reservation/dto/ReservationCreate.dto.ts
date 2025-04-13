import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDefined,
    IsEnum,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

import { ReservationAgeGroupDTO } from './ReservationAgeGroup.dto'
import { ReservationReservationOptionDTO } from './ReservationReservationOption.dto'
import { ReservationServiceDTO } from './ReservationService.dto'

export class ReservationCreateDTO {
    @ApiProperty({
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
    })
    @IsDefined()
    @IsEnum(ReservationStatus)
    status!: ReservationStatus

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsOptional()
    @IsUUID()
    userId: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsOptional()
    @IsUUID()
    sellerUserId?: string

    @ApiProperty({
        enum: ReservationSaleChannel,
        example: ReservationSaleChannel.BOOKSUITE,
        required: false,
    })
    @IsOptional()
    @IsEnum(ReservationSaleChannel)
    saleChannel?: ReservationSaleChannel

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

    @ApiProperty({ type: [ReservationAgeGroupDTO] })
    @IsDefined()
    @IsArray()
    ageGroups!: ReservationAgeGroupDTO[]

    @ApiProperty({ example: 'Featured booking' })
    @IsDefined()
    @IsString()
    notes!: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsUUID()
    housingUnitId: string

    @ApiProperty({ type: [ReservationServiceDTO] })
    @IsDefined()
    @IsArray()
    @Type(() => ReservationServiceDTO)
    services!: ReservationServiceDTO[]

    @ApiProperty({ type: [ReservationReservationOptionDTO] })
    @IsDefined()
    @IsArray()
    @Type(() => ReservationReservationOptionDTO)
    reservationOption: ReservationReservationOptionDTO[]
}
