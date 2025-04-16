import { ApiProperty } from '@nestjs/swagger'

import { TariffOptionHousingUnitTypeDTO } from './TariffOptionHousingUnitType.dto'
import { TariffOptionResponseDTO } from './TariffOptionResponse.dto'
import { TariffOptionAgeGroupResponseDTO } from './TarifOptionAgeGroupResponse.dto'

export class TariffOptionResponseFullDTO extends TariffOptionResponseDTO {
    @ApiProperty({ type: [TariffOptionHousingUnitTypeDTO] })
    availableHousingUnitTypes!: TariffOptionHousingUnitTypeDTO[]

    @ApiProperty({
        type: [TariffOptionAgeGroupResponseDTO],
    })
    ageGroupPrices!: TariffOptionAgeGroupResponseDTO[]
}
