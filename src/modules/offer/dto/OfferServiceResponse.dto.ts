import { ApiProperty } from '@nestjs/swagger'

import { ServiceResponseDTO } from '../../service/dtos/ServiceResponse.dto'

export class OfferServiceResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ type: ServiceResponseDTO })
    service: ServiceResponseDTO
}
