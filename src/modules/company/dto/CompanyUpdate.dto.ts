import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { CompanyContactDTO } from './CompanyContact.dto'
import { CompanyFacilityDTO } from './CompanyFacility.dto'
import { CompanySettingsDTO } from './CompanySettings.dto'

export class CompanyUpdateDTO {
    @ApiProperty({ example: 'Company name', required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({ example: 'Company simplified name', required: false })
    @IsOptional()
    @IsString()
    slug?: string

    @ApiProperty({
        example: 'Company short Description',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    shortDescription?: string | null

    @ApiProperty({
        example: 'Company Description',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    description?: string | null

    @ApiProperty({ example: 'Timezone', required: false, nullable: true })
    @IsOptional()
    @IsString()
    timezone?: string | null

    @ApiProperty({ example: 'LogoURL', required: false, nullable: true })
    @IsOptional()
    @IsString()
    logo?: string | null

    @ApiProperty({ example: 'Favicon', required: false, nullable: true })
    @IsOptional()
    @IsString()
    favIcon?: string | null

    @ApiProperty({ type: CompanySettingsDTO, required: false, nullable: true })
    @IsOptional()
    @Type(() => CompanySettingsDTO)
    @ValidateNested()
    settings?: CompanySettingsDTO | null

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

    @ApiProperty({ example: 'Person resposible', required: false })
    @IsOptional()
    @IsString()
    responsible?: string

    @ApiProperty({
        example: 'Resposible email address',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    responsibleEmail?: string | null

    @ApiProperty({
        example: 'Resposible phone number',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    responsiblePhone?: string | null

    @ApiProperty({ example: 'CNPJ', required: false })
    @IsOptional()
    @IsString()
    docType?: string

    @ApiProperty({ example: 'Resposible identification', required: false })
    @IsOptional()
    @IsString()
    identification?: string

    @ApiProperty({ example: 'Company legal name', required: false })
    @IsOptional()
    @IsString()
    companyName?: string

    @ApiProperty({
        example: 'State registration',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    stateRegistration?: string | null

    @ApiProperty({
        example: 'Municipal registration',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    municipalRegistration?: string | null

    @ApiProperty({ example: 'Street', required: false })
    @IsOptional()
    @IsString()
    address?: string

    @ApiProperty({ example: 'Number', required: false })
    @IsOptional()
    @IsString()
    number?: string

    @ApiProperty({ example: 'Country', required: false })
    @IsOptional()
    @IsString()
    country?: string

    @ApiProperty({ example: 'State', required: false })
    @IsOptional()
    @IsString()
    state?: string

    @ApiProperty({ type: [CompanyFacilityDTO], required: false })
    @IsOptional()
    @Type(() => CompanyFacilityDTO)
    @ValidateNested({ each: true })
    facilities?: CompanyFacilityDTO[]

    @ApiProperty({ example: 'City', required: false })
    @IsOptional()
    @IsString()
    city?: string
}
