import { ApiProperty } from '@nestjs/swagger'

import { TariffOptionResponseDTO } from '@/modules/tariffOption/dto/TariffOptionResponse.dto'

export class TariffOptionReservationResponseDTO {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    tariffOptionId: string

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    reservationId!: string

    @ApiProperty({ type: TariffOptionResponseDTO })
    tariffOption: TariffOptionResponseDTO
}
