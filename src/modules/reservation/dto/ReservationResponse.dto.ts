import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'
import { IsDefined, IsEnum, IsOptional } from 'class-validator'

export class ReservationResponseDTO {
    @ApiProperty({
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
    })
    @IsDefined()
    @IsEnum(ReservationStatus)
    status!: ReservationStatus

    @ApiProperty({
        enum: ReservationSaleChannel,
        example: ReservationSaleChannel.BOOKSUITE,
    })
    @IsOptional()
    @IsEnum(ReservationSaleChannel)
    saleChannel: ReservationSaleChannel

    @ApiProperty({ example: '2024-10-17T13:19:15.271634Z' })
    startDate!: Date

    @ApiProperty({ example: '2025-01-14T13:19:15.271598Z' })
    endDate!: Date

    @ApiProperty({ example: 7, nullable: true, type: Number })
    totalDays: number | null

    @ApiProperty({ example: 2, nullable: true, type: Number })
    adults: number | null

    @ApiProperty({ example: 1, nullable: true, type: Number })
    children: number | null

    @ApiProperty({ example: 'Featured booking' })
    notes!: string

    @ApiProperty({ example: '2024-07-19T13:19:15.271637Z' })
    createdAt!: Date

    @ApiProperty({ example: '2024-07-29T13:19:15.271631Z' })
    updatedAt!: Date
}
