import { ApiProperty } from '@nestjs/swagger'

import { CompanySettings } from '@/modules/company/types/json'

export class CompanySettingsThemeResponseDTO {
    @ApiProperty({ example: '31081fbf-8762-4156-8c0e-f9b4933b1d89' })
    id?: string

    @ApiProperty({ default: '#000000', required: false })
    color?: string
}

export class CompanySettingsResponseDTO implements CompanySettings {
    @ApiProperty({ example: '31081fbf-8762-4156-8c0e-f9b4933b1d89' })
    id?: string

    @ApiProperty({ type: CompanySettingsThemeResponseDTO, required: false })
    theme?: CompanySettingsThemeResponseDTO
}
