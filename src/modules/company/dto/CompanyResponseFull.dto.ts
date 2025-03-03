import { ApiProperty } from '@nestjs/swagger'

import { CompanyContactResponseDTO } from './CompanyContactResponse.dto'
import { CompanyFacilityResponseDTO } from './CompanyFacilityResponse.dto'
import { CompanyResponseDTO } from './CompanyResponse.dto'
import { CompanySettingsResponseDTO } from './CompanySettingsResponse.dto'

export class CompanyResponseFullDTO extends CompanyResponseDTO {
    @ApiProperty({ type: CompanySettingsResponseDTO, required: false })
    settings: CompanySettingsResponseDTO | null

    @ApiProperty({
        type: [CompanyContactResponseDTO],
        required: false,
        default: [{ type: 'phone', value: '00000000000' }],
    })
    contacts: CompanyContactResponseDTO[]

    @ApiProperty({ type: [CompanyFacilityResponseDTO] })
    facilities!: CompanyFacilityResponseDTO[]
}
