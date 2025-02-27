import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitResponseDTO } from './HousingUnitResponse.dto'
import { HousingUnitTypeFacilityResponseDTO } from './HousingUnitTypeFacilityResponse.dto'
import { HousingUnitTypeMediaResponseDTO } from './HousingUnitTypeMediaResponse.dto'
import { HousingUnitTypeResponseDTO } from './HousingUnitTypeResponse.dto'

export class HousingUnitTypeResponseFullDTO extends HousingUnitTypeResponseDTO {
    @ApiProperty({ type: [HousingUnitResponseDTO] })
    housingUnits!: HousingUnitResponseDTO[]

    @ApiProperty({ type: [HousingUnitTypeFacilityResponseDTO] })
    facilities!: HousingUnitTypeFacilityResponseDTO[]

    @ApiProperty({ type: [HousingUnitTypeMediaResponseDTO] })
    medias?: HousingUnitTypeMediaResponseDTO[]
}
