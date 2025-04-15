import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'

export class ReservationResponseDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id!: string

    @ApiProperty({
        enum: ReservationStatus,
        example: ReservationStatus.CONFIRMED,
    })
    status!: ReservationStatus

    @ApiProperty({
        enum: ReservationSaleChannel,
        example: ReservationSaleChannel.BOOKSUITE,
    })
    saleChannel: ReservationSaleChannel

    @ApiProperty({ example: '2024-10-17T13:19:15.271634Z' })
    startDate!: Date

    @ApiProperty({ example: '2025-01-14T13:19:15.271598Z' })
    endDate!: Date

    @ApiProperty({ example: 7, nullable: true, type: Number })
    totalDays: number | null

    @ApiProperty({ example: 7, type: Number })
    finalPrice: number

    @ApiProperty({ example: 2, nullable: true, type: Number })
    adults: number | null

    @ApiProperty({ example: 'Featured booking' })
    notes!: string

    @ApiProperty({ example: '2024-07-19T13:19:15.271637Z' })
    createdAt!: Date

    @ApiProperty({ example: '2024-07-29T13:19:15.271631Z' })
    updatedAt!: Date
}
