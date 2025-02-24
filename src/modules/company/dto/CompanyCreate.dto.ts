import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDefined,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { CompanyContactDTO } from './CompanyContact.dto'
import { CompanyFacilityDTO } from './CompanyFacility.dto'
import { CompanySettingsDTO } from './CompanySettings.dto'

export class CompanyCreateDTO {
    @ApiProperty({ example: 'Company name' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'Company simplified name' })
    @IsDefined()
    @IsString()
    slug!: string

    @ApiProperty({ example: 'Company short Description', required: false })
    @IsOptional()
    @IsString()
    shortDescription?: string

    @ApiProperty({ example: 'Company Description', required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ example: 'Timezone', required: false })
    @IsOptional()
    @IsString()
    timezone?: string

    @ApiProperty({ example: 'LogoURL', required: false })
    @IsOptional()
    @IsString()
    logo?: string

    @ApiProperty({ example: 'Favicon', required: false })
    @IsOptional()
    @IsString()
    favIcon?: string

    @ApiProperty({ type: CompanySettingsDTO, required: false })
    @IsOptional()
    @Type(() => CompanySettingsDTO)
    @ValidateNested()
    settings?: CompanySettingsDTO

    @ApiProperty({
        type: [CompanyContactDTO],
        required: false,
        default: [{ type: 'phone', value: '00000000000' }],
    })
    @IsOptional()
    @Type(() => CompanyContactDTO)
    @IsArray()
    @ValidateNested({ each: true })
    contacts?: CompanyContactDTO[]

    @ApiProperty({ example: 'Person resposible' })
    @IsDefined()
    @IsString()
    responsible!: string

    @ApiProperty({ example: 'Resposible email address', required: false })
    @IsOptional()
    @IsString()
    responsibleEmail?: string

    @ApiProperty({ example: 'Resposible phone number', required: false })
    @IsOptional()
    @IsString()
    responsiblePhone?: string

    @IsDefined()
    @IsString()
    docType!: string

    @ApiProperty({ example: 'Resposible identification' })
    @IsDefined()
    @IsString()
    identification!: string

    @ApiProperty({ example: 'Company legal name' })
    @IsDefined()
    @IsString()
    companyName!: string

    @ApiProperty({ example: 'State registration', required: false })
    @IsOptional()
    @IsString()
    stateRegistration?: string

    @ApiProperty({ example: 'Municipal registration', required: false })
    @IsOptional()
    @IsString()
    municipalRegistration?: string

    @ApiProperty({ example: 'Street' })
    @IsDefined()
    @IsString()
    address!: string

    @ApiProperty({ example: 'Number' })
    @IsDefined()
    @IsString()
    number!: string

    @ApiProperty({ example: 'Country' })
    @IsDefined()
    @IsString()
    country!: string

    @ApiProperty({ example: 'State' })
    @IsDefined()
    @IsString()
    state!: string

    @ApiProperty({ type: [CompanyFacilityDTO] })
    @IsDefined()
    @Type(() => CompanyFacilityDTO)
    @ValidateNested({ each: true })
    facilities!: CompanyFacilityDTO[]

    @ApiProperty({ example: 'City' })
    @IsDefined()
    @IsString()
    city!: string
}
