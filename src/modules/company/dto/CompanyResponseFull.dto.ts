import { ApiProperty } from '@nestjs/swagger'

import { CompanyContactResponseDTO } from './CompanyContactResponse.dto'
import { CompanyFacilityResponseDTO } from './CompanyFacilityResponse.dto'
import { CompanyHomeMediaResponseDTO } from './CompanyHomeMediaResponse.dto'
import { CompanyResponseDTO } from './CompanyResponse.dto'
import { CompanySettingsResponseDTO } from './CompanySettingsResponse.dto'

export class CompanyResponseFullDTO extends CompanyResponseDTO {
    @ApiProperty({ type: CompanySettingsResponseDTO, nullable: true })
    settings: CompanySettingsResponseDTO | null

    @ApiProperty({
        type: [CompanyContactResponseDTO],
        nullable: true,
        default: [{ type: 'phone', categoy: 'Reserva', value: '00000000000' }],
    })
    contacts: CompanyContactResponseDTO[] | null

    @ApiProperty({ type: [CompanyFacilityResponseDTO] })
    facilities: CompanyFacilityResponseDTO[]

    @ApiProperty({ example: 'company page home media', required: false })
    homeMedia: CompanyHomeMediaResponseDTO[]
}
