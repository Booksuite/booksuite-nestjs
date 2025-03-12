import { ApiProperty } from '@nestjs/swagger'
import { ReservationDepositType } from '@prisma/client'

export class ReservationConfigResponseDTO {
    @ApiProperty({
        example: '0094887f-a46b-4e18-8f53-e05f143e447',
    })
    id!: string

    @ApiProperty({
        example: 5,
        type: Number,
        nullable: true,
        description: 'Percentage added at the end of purchase',
    })
    tax: number | null

    @ApiProperty({
        enum: ReservationDepositType,
        example: ReservationDepositType.PERCENTAGE_ON_RESERVATION,
    })
    reservationDepositType!: ReservationDepositType

    @ApiProperty({
        example: 50,
        type: Number,
        nullable: true,
    })
    reservationDepositTypeValue: number | null

    @ApiProperty({
        example: 'Reservation Policy, big text.',
    })
    reservationPolicy!: string
}
