import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypeResponseDTO } from '../../housingUnitType/dto/HousingUnitTypeResponse.dto'

export class OfferHousingUnitTypeResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ type: HousingUnitTypeResponseDTO })
    housingUnitType: HousingUnitTypeResponseDTO
}
