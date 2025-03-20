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
    })
    @IsOptional()
    @IsUUID()
    userId?: string | null

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        required: false,
        nullable: true,
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

    @ApiProperty({ example: '2025-01-14T13:19:15.271598Z', required: false })
    @IsOptional()
    @IsISO8601()
    startDate?: Date

    @ApiProperty({ example: '2024-10-10T13:19:15.271627Z', required: false })
    @IsOptional()
    @IsISO8601()
    endDate?: Date

    @ApiProperty({ example: '7', required: false, nullable: true })
    @IsOptional()
    @IsInt()
    totalDays?: number | null

    @ApiProperty({ example: '2', required: false })
    @IsOptional()
    @IsInt()
    adults?: number

    @ApiProperty({ example: '1', required: false })
    @IsOptional()
    @IsInt()
    children?: number

    @ApiProperty({ example: 'Featured booking', required: false })
    @IsOptional()
    @IsString()
    notes?: string

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsUUID()
    housingUnitId?: string | null

    @ApiProperty({ type: [ReservationServiceDTO], required: false })
    @IsOptional()
    @IsArray()
    @Type(() => ReservationServiceDTO)
    services?: ReservationServiceDTO[]
}
