import { ApiProperty } from '@nestjs/swagger'

import { RateOptionAgeGroupResponseDTO } from './RateOptionAgeGroupResponse.dto'
import { RateOptionResponseDTO } from './RateOptionResponse.dto'

export class RateOptionResponseFullDTO extends RateOptionResponseDTO {
    @ApiProperty({
        type: [RateOptionAgeGroupResponseDTO],
    })
    ageGroupPrices!: RateOptionAgeGroupResponseDTO[]
}
