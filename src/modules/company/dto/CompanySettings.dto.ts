import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsString, ValidateNested } from 'class-validator'

import { CompanySettings } from '@/modules/company/types/json'

export class CompanySettingsThemeDTO {
    @ApiProperty({ default: '#000000', required: false })
    @IsOptional()
    @IsString()
    color?: string
}

export class CompanySettingsDTO implements CompanySettings {
    @ApiProperty({ type: CompanySettingsThemeDTO, required: false })
    @IsOptional()
    @Type(() => CompanySettingsThemeDTO)
    @ValidateNested()
    theme?: CompanySettingsThemeDTO
}
