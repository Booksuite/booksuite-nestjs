import { ApiProperty } from '@nestjs/swagger'
import { CompanyType } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator'

import { MapCoordinatesDTO } from '@/common/dto/MapCoodinates.dto'

import { CompanyContactDTO } from './CompanyContact.dto'
import { CompanyFacilityDTO } from './CompanyFacility.dto'
import { CompanySettingsDTO } from './CompanySettings.dto'

export class CompanyUpdateDTO {
    @ApiProperty({ example: 'Company name', required: false, type: String })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({
        example: 'Company simplified name',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    slug?: string

    @ApiProperty({
        example: 'Company short Description',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    shortDescription?: string | null

    @ApiProperty({
        example: 'Company Description',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    description?: string | null

    @ApiProperty({
        example: 'Timezone',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    timezone?: string | null

    @ApiProperty({
        example: 'LogoURL',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    logo?: string | null

    @ApiProperty({
        example: 'Favicon',
        required: false,
        nullable: true,
        type: String,
    })
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

    @ApiProperty({
        example: 'Person resposible',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    responsible?: string

    @ApiProperty({
        example: 'Resposible email address',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    responsibleEmail?: string

    @ApiProperty({
        example: 'Resposible phone number',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    responsiblePhone?: string

    @ApiProperty({
        example: '88811901',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    zipcode?: string

    @ApiProperty({
        enum: CompanyType,
        required: false,
        type: String,
    })
    @IsOptional()
    @IsEnum(CompanyType)
    type?: CompanyType

    @ApiProperty({ example: 'CNPJ', required: false, type: String })
    @IsOptional()
    @IsString()
    docType?: string

    @ApiProperty({
        example: 'Resposible identification',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    identification?: string

    @ApiProperty({
        example: 'Company legal name',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    companyName?: string

    @ApiProperty({
        example: 'State registration',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    stateRegistration?: string | null

    @ApiProperty({
        example: 'Municipal registration',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    municipalRegistration?: string | null

    @ApiProperty({ example: 'Street', required: false, type: String })
    @IsOptional()
    @IsString()
    address?: string

    @ApiProperty({ example: 'Number', required: false, type: String })
    @IsOptional()
    @IsString()
    number?: string

    @ApiProperty({ example: 'Country', required: false, type: String })
    @IsOptional()
    @IsString()
    country?: string

    @ApiProperty({ example: 'State', required: false, type: String })
    @IsOptional()
    @IsString()
    state?: string

    @ApiProperty({ type: [CompanyFacilityDTO], required: false })
    @IsOptional()
    @Type(() => CompanyFacilityDTO)
    @ValidateNested({ each: true })
    facilities?: CompanyFacilityDTO[]

    @ApiProperty({ example: 'City', required: false, type: String })
    @IsOptional()
    @IsString()
    city?: string

    @ApiProperty({
        example: 'Privacy policy description',
        type: String,
        required: false,
        nullable: true,
    })
    @IsOptional()
    privacyPolicyDescription?: string | null

    @ApiProperty({
        example: 'Privacy policy simple model',
        type: String,
        required: false,
        nullable: true,
    })
    @IsOptional()
    privacyPolicySimpleModel?: string | null

    @ApiProperty({
        example: 'Privacy policy full model',
        type: String,
        required: false,
        nullable: true,
    })
    @IsOptional()
    privacyPolicyFullModel?: string | null

    @ApiProperty({
        type: MapCoordinatesDTO,
        example: 'Map coordinates',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @Type(() => MapCoordinatesDTO)
    @ValidateNested()
    mapCoordinates?: MapCoordinatesDTO | null

    @ApiProperty({
        example: 'e23d2e3e-6bf9-4b7c-8aec-73c37a5b9d8f',
        type: String,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsUUID()
    bannerImageId?: string | null

    @ApiProperty({
        example: 'Banner title',
        nullable: true,
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    bannerTitle?: string | null

    @ApiProperty({
        example: 'Banner description',
        nullable: true,
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    bannerDescription?: string | null
}
