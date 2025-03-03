import { ApiProperty } from '@nestjs/swagger'

export class ReservationResponseDTO {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    id!: string

    @ApiProperty({ example: 'CONFIRMED' })
    status!: string

    @ApiProperty({ example: '2024-10-17T13:19:15.271634Z' })
    startDate!: Date

    @ApiProperty({ example: '2025-01-14T13:19:15.271598Z' })
    endDate!: Date

    @ApiProperty({ example: '7' })
    totalDays?: number | null

    @ApiProperty({ example: '2' })
    adults!: number | null

    @ApiProperty({ example: '1' })
    children!: number | null

    @ApiProperty({ example: 'Online' })
    saleChannel!: string

    @ApiProperty({ example: 'Featured booking' })
    notes!: string

    @ApiProperty({ example: '2024-07-19T13:19:15.271637Z' })
    createdAt!: Date

    @ApiProperty({ example: '2024-07-29T13:19:15.271631Z' })
    updatedAt!: Date
}
