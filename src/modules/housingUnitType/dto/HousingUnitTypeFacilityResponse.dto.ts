import { ApiProperty } from '@nestjs/swagger'

import { FacilityResponseDTO } from '@/modules/facility/dto/FacilityResponse.dto'

export class HousingUnitTypeFacilityResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ example: true, nullable: true, type: Boolean })
    isFeatured: boolean | null

    @ApiProperty({ type: FacilityResponseDTO })
    facility: FacilityResponseDTO
}
