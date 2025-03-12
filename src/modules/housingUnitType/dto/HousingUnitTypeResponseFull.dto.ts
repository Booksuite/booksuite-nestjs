import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitResponseDTO } from './HousingUnitResponse.dto'
import { HousingUnitTypeFacilityResponseDTO } from './HousingUnitTypeFacilityResponse.dto'
import { HousingUnitTypeResponseDTO } from './HousingUnitTypeResponse.dto'

export class HousingUnitTypeResponseFullDTO extends HousingUnitTypeResponseDTO {
    @ApiProperty({ type: [HousingUnitResponseDTO] })
    housingUnits!: HousingUnitResponseDTO[]

    @ApiProperty({ type: [HousingUnitTypeFacilityResponseDTO] })
    facilities!: HousingUnitTypeFacilityResponseDTO[]
}
