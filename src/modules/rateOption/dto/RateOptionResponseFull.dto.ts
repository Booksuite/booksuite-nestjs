import { ApiProperty } from '@nestjs/swagger'

import { RateOptionAgeGroupResponseDTO } from './RateOptionAgeGroupResponse.dto'
import { RateOptionHousingUnitTypeDTO } from './RateOptionHousingUnitType.dto'
import { RateOptionResponseDTO } from './RateOptionResponse.dto'

export class RateOptionResponseFullDTO extends RateOptionResponseDTO {
    @ApiProperty({ type: [RateOptionHousingUnitTypeDTO] })
    availableHousingUnitTypes!: RateOptionHousingUnitTypeDTO[]

    @ApiProperty({
        type: [RateOptionAgeGroupResponseDTO],
    })
    ageGroupPrices!: RateOptionAgeGroupResponseDTO[]
}
