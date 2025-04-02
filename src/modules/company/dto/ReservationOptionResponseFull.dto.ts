import { ApiProperty } from '@nestjs/swagger'

import { AddiotionalAgeGroupPriceDTO } from './AdditionalAgeGroupsPrice.dto'
import { ReservationOptionHousingUnitTypeDTO } from './ReservationOptionHousingUnitType.dto'
import { ReservationOptionResponseDTO } from './ReservationOptionResponse.dto'

export class ReservationOptionResponseFullDTO extends ReservationOptionResponseDTO {
    @ApiProperty({ type: [ReservationOptionHousingUnitTypeDTO] })
    availableHousingUnitTypes!: ReservationOptionHousingUnitTypeDTO[]

    @ApiProperty({ type: [AddiotionalAgeGroupPriceDTO] })
    additionalAgeGroupPrice: PrismaJson.AdditionalAgeGroupsPrices
}
