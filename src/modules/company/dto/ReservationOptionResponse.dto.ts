import { ApiProperty } from '@nestjs/swagger'

import { AgeGroupPriceDTO } from './AdditionalAgeGroupsPrices.dto'
import { ReservationOptionHousingUnitTypeDTO } from './ReservationOptionHousingUnitType.dto'
import { ReservationOptionResponseDTO } from './ReservationOptionResponse.dto copy'

export class ReservationOptionResponseFullDTO extends ReservationOptionResponseDTO {
    @ApiProperty({ type: [ReservationOptionHousingUnitTypeDTO] })
    availableHousingUnitTypes!: ReservationOptionHousingUnitTypeDTO[]

    @ApiProperty({ type: [AgeGroupPriceDTO] })
    additionalAgeGroupPrice: AgeGroupPriceDTO[]
}
