import { ApiProperty } from '@nestjs/swagger'

import { ReservationOptionAgeGroupResponseDTO } from './ReservationOptionAgeGroupResponse.dto'
import { ReservationOptionHousingUnitTypeDTO } from './ReservationOptionHousingUnitType.dto'
import { ReservationOptionResponseDTO } from './ReservationOptionResponse.dto'

export class ReservationOptionResponseFullDTO extends ReservationOptionResponseDTO {
    @ApiProperty({ type: [ReservationOptionHousingUnitTypeDTO] })
    availableHousingUnitTypes!: ReservationOptionHousingUnitTypeDTO[]

    @ApiProperty({
        type: [ReservationOptionAgeGroupResponseDTO],
        isArray: true,
    })
    ageGroupPrices!: ReservationOptionAgeGroupResponseDTO[]
}
