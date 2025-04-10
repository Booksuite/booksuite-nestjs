import { ApiProperty } from '@nestjs/swagger'

import { ReservationOptionResponseDTO } from '@/modules/company/dto/ReservationOptionResponse.dto'

export class ReservationReservationOptionResponseDTO {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    reservationOptionId: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    reservationId!: string

    @ApiProperty({ type: ReservationOptionResponseDTO })
    reservationOption: ReservationOptionResponseDTO
}
