import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitResponse.dto'
import { UserResponseDTO } from '@/modules/user/dto/UserCreateResponse.dto'

import { ReservationAgeGroupResponseDTO } from './ReservationAgeGroupResponse.dto'
import { ReservationReservationOptionResponseDTO } from './ReservationReservationOptionResponse.dto'
import { ReservationResponseDTO } from './ReservationResponse.dto'
import { ReservationServiceResponseDTO } from './ReservationServiceResponse.dto'

export class ReservationResponseFullDTO extends ReservationResponseDTO {
    @ApiProperty({ type: HousingUnitResponseDTO })
    housingUnit!: HousingUnitResponseDTO | null

    @ApiProperty({ type: [ReservationServiceResponseDTO] })
    services!: ReservationServiceResponseDTO[]

    @ApiProperty({ type: UserResponseDTO, nullable: true })
    guestUser: UserResponseDTO | null

    @ApiProperty({ type: UserResponseDTO, nullable: true })
    sellerUser: UserResponseDTO | null

    @ApiProperty({ type: [ReservationAgeGroupResponseDTO] })
    children: ReservationAgeGroupResponseDTO[]

    @ApiProperty({ type: [ReservationReservationOptionResponseDTO] })
    reservationOption: ReservationReservationOptionResponseDTO[]
}
