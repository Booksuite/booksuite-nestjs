import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypeResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponse.dto'
import { RateOptionResponseFullDTO } from '@/modules/rateOption/dto/RateOptionResponseFull.dto'
import { UserResponseDTO } from '@/modules/user/dto/UserCreateResponse.dto'

import { ReservationAgeGroupResponseDTO } from './ReservationAgeGroupResponse.dto'
import { ReservationResponseDTO } from './ReservationResponse.dto'
import { ReservationServiceResponseDTO } from './ReservationServiceResponse.dto'

export class ReservationResponseFullDTO extends ReservationResponseDTO {
    @ApiProperty({ type: [ReservationServiceResponseDTO] })
    services!: ReservationServiceResponseDTO[]

    @ApiProperty({ type: UserResponseDTO, nullable: true })
    sellerUser: UserResponseDTO | null

    @ApiProperty({ type: [ReservationAgeGroupResponseDTO] })
    ageGroups: ReservationAgeGroupResponseDTO[]

    @ApiProperty({ type: RateOptionResponseFullDTO, nullable: true })
    rateOption: RateOptionResponseFullDTO | null

    @ApiProperty({ type: HousingUnitTypeResponseDTO, nullable: true })
    housingUnitType: HousingUnitTypeResponseDTO | null
}
