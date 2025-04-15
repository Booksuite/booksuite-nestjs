import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypePricingChangeDTO } from '@/common/dto/HousingUnitTypePricingChange.dto'

import { SpecialDateMediaResponseDTO } from './SpecialDateMediaResponse.dto'
import { SpecialDateResponseDTO } from './SpecialDateResponse.dto'
import { SpecialDateServiceResponseDTO } from './SpecialDateServiceResponse.dto'

export class SpecialDateResponseFullDTO extends SpecialDateResponseDTO {
    @ApiProperty({ type: [SpecialDateMediaResponseDTO] })
    medias!: SpecialDateMediaResponseDTO[]

    @ApiProperty({
        type: [HousingUnitTypePricingChangeDTO],
        nullable: true,
    })
    housingUnitTypePrices: HousingUnitTypePricingChangeDTO[] | null

    @ApiProperty({ type: [SpecialDateServiceResponseDTO], nullable: true })
    includedServices: SpecialDateServiceResponseDTO[] | null
}
