import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypeResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponse.dto'

export class ReservationOptionHousingUnitTypeResponseDTO {
    @ApiProperty({ example: 'd68ffa59-0c42-49a6-b6d8-312569e33505' })
    id!: string

    @ApiProperty({ type: HousingUnitTypeResponseDTO })
    housingUnitType!: HousingUnitTypeResponseDTO
}
