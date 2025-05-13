import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypePricingChangeDTO } from '@/common/dto/HousingUnitTypePricingChange.dto'

import { SpecialDateMediaResponseDTO } from './SpecialDateMediaResponse.dto'
import { SpecialDateResponseDTO } from './SpecialDateResponse.dto'

export class SpecialDateResponseFullDTO extends SpecialDateResponseDTO {
    @ApiProperty({ type: [SpecialDateMediaResponseDTO] })
    medias!: SpecialDateMediaResponseDTO[]

    @ApiProperty({
        type: [HousingUnitTypePricingChangeDTO],
        nullable: true,
    })
    housingUnitTypePrices: HousingUnitTypePricingChangeDTO[] | null
}
