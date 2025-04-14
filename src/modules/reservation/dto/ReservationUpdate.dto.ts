import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
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

export class ReservationUpdateDTO {
    @ApiProperty({
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
        required: false,
    })
    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsUUID()
    userId?: string | null

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsUUID()
    sellerUserId?: string | null

    @ApiProperty({
        enum: ReservationSaleChannel,
        example: ReservationSaleChannel.BOOKSUITE,
        required: false,
    })
    @IsOptional()
    @IsEnum(ReservationSaleChannel)
    saleChannel?: ReservationSaleChannel

    @ApiProperty({
        example: '2025-01-14T13:19:15.271598Z',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsISO8601()
    startDate?: string

    @ApiProperty({
        example: '2024-10-10T13:19:15.271627Z',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsISO8601()
    endDate?: string

    @ApiProperty({
        example: '7',
        required: false,

        type: Number,
    })
    @IsOptional()
    @IsInt()
    totalDays?: number

    @ApiProperty({ example: '2', required: false, type: Number })
    @IsOptional()
    @IsInt()
    adults?: number

    @ApiProperty({ type: [ReservationAgeGroupDTO], required: false })
    @IsOptional()
    @IsArray()
    ageGroups?: ReservationAgeGroupDTO[]

    @ApiProperty({ example: 'Featured booking', required: false, type: String })
    @IsOptional()
    @IsString()
    notes?: string

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsUUID()
    housingUnitId?: string

    @ApiProperty({ example: 7, type: Number, required: false })
    @IsOptional()
    finalReservationPrice?: number

    @ApiProperty({ type: [ReservationServiceDTO], required: false })
    @IsOptional()
    @IsArray()
    @Type(() => ReservationServiceDTO)
    services?: ReservationServiceDTO[]

    @ApiProperty({ type: [ReservationReservationOptionDTO], required: false })
    @IsOptional()
    @IsArray()
    @Type(() => ReservationReservationOptionDTO)
    reservationOption?: ReservationReservationOptionDTO[]
}
