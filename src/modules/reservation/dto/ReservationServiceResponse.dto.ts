import { ApiProperty } from '@nestjs/swagger'

import { ServiceResponseDTO } from '@/modules/service/dtos/ServiceResponse.dto'

export class ReservationServiceResponseDTO {
    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    id: string

    @ApiProperty({ example: 2 })
    qtd: number

    @ApiProperty({ example: 250 })
    totalPrice: number

    @ApiProperty({ type: ServiceResponseDTO })
    service: ServiceResponseDTO
}
