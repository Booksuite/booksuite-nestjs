import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitResponse.dto'

import { ReservationResponseDTO } from './ReservationResponse.dto'
import { ReservationServiceResponseDTO } from './ReservationServiceResponse.dto'

export class ReservationResponseFullDTO extends ReservationResponseDTO {
    @ApiProperty({ type: HousingUnitResponseDTO })
    HousingUnit!: HousingUnitResponseDTO | null

    @ApiProperty({ type: [ReservationServiceResponseDTO] })
    services!: ReservationServiceResponseDTO[]
}
