import { ApiProperty } from '@nestjs/swagger'

import { SpecialDateMediaResponseDTO } from './SpecialDateMediaResponse.dto'
import { SpecialDateResponseDTO } from './SpecialDateResponse.dto'
import { SpecialDateServiceResponseDTO } from './SpecialDateServiceResponse.dto'
import { SpecialDateHousingUnitTypeResponseDTO } from './SpecialHousingUnitTypeResponse.dto'

export class SpecialDateResponseFullDTO extends SpecialDateResponseDTO {
    @ApiProperty({ type: [SpecialDateMediaResponseDTO] })
    medias!: SpecialDateMediaResponseDTO[]

    @ApiProperty({
        type: [SpecialDateHousingUnitTypeResponseDTO],
        nullable: true,
    })
    housingUnitTypePrices: SpecialDateHousingUnitTypeResponseDTO[] | null

    @ApiProperty({ type: [SpecialDateServiceResponseDTO], nullable: true })
    includedServices: SpecialDateServiceResponseDTO[] | null
}
