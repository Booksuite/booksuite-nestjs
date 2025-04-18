import { ApiProperty } from '@nestjs/swagger'

import { RateOptionResponseDTO } from '@/modules/rateOption/dto/RateOptionResponse.dto'

export class RateOptionReservationResponseDTO {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    tariffOptionId: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    reservationId!: string

    @ApiProperty({ type: RateOptionResponseDTO })
    tariffOption: RateOptionResponseDTO
}
