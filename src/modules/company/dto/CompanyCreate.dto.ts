import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator'

import { MapCoordinatesDTO } from '@/common/dto/MapCoodinates.dto'

import { CompanyContactDTO } from './CompanyContact.dto'
import { CompanyFacilityDTO } from './CompanyFacility.dto'
import { CompanySettingsDTO } from './CompanySettings.dto'

export class CompanyCreateDTO {
    @ApiProperty({ example: 'Company name' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    published!: boolean

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
        default: [{ type: 'phone', category: 'Reserva', value: '00000000000' }],
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

    @ApiProperty({ example: 'Resposible email address' })
    @IsOptional()
    @IsString()
    responsibleEmail: string

    @ApiProperty({ example: 'Resposible phone number' })
    @IsOptional()
    @IsString()
    responsiblePhone: string

    @ApiProperty({ example: 'CNPJ' })
    @IsDefined()
    @IsString()
    docType!: string

    @ApiProperty({ example: 'Resposible identification', required: false })
    @IsOptional()
    @IsString()
    identification?: string

    @ApiProperty({ example: 'Company legal name', required: false })
    @IsOptional()
    @IsString()
    companyName?: string

    @ApiProperty({ example: 'State registration', required: false })
    @IsOptional()
    @IsString()
    stateRegistration?: string

    @ApiProperty({ example: 'Municipal registration', required: false })
    @IsOptional()
    @IsString()
    municipalRegistration?: string

    @ApiProperty({ example: 'Street', required: false })
    @IsOptional()
    @IsString()
    address?: string

    @ApiProperty({ example: 'Zipcode', required: false })
    @IsOptional()
    @IsString()
    zipcode?: string

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

    @ApiProperty({ example: 'City', required: false })
    @IsDefined()
    @IsString()
    city!: string

    @ApiProperty({ type: [CompanyFacilityDTO], required: false })
    @IsOptional()
    @Type(() => CompanyFacilityDTO)
    @ValidateNested({ each: true })
    facilities?: CompanyFacilityDTO[]

    @ApiProperty({
        type: MapCoordinatesDTO,
        example: 'Map coordinates',
    })
    @IsDefined()
    @Type(() => MapCoordinatesDTO)
    @ValidateNested()
    mapCoordinates: MapCoordinatesDTO

    @ApiProperty({
        example: 'e23d2e3e-6bf9-4b7c-8aec-73c37a5b9d8f',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsUUID()
    bannerImageId?: string

    @ApiProperty({ example: 'Banner title', required: false })
    @IsOptional()
    @IsString()
    bannerTitle?: string

    @ApiProperty({ example: 'Banner description', required: false })
    @IsOptional()
    @IsString()
    bannerDescription?: string
}
