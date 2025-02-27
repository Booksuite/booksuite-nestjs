import { ApiProperty } from '@nestjs/swagger'

export class ReservationResponseDTO {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    id!: string

    @ApiProperty({ example: 'CONFIRMED' })
    status!: string

    @ApiProperty({ example: '02/08/2025' })
    startDate!: Date

    @ApiProperty({ example: '02/10/2025' })
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
}
