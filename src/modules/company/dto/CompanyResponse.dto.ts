import { ApiProperty } from '@nestjs/swagger'
import { CompanyType } from '@prisma/client'

import { MapCoordinatesDTO } from '@/common/dto/MapCoodinates.dto'
import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

import { CompanyMediaResponseDTO } from './CompanyMediaResponse.dto'
export class CompanyResponseDTO {
    @ApiProperty({ example: 'bcd82497-2cc3-4998-b3d9-99db2f56b159' })
    id!: string

    @ApiProperty({ example: 'Company name' })
    name!: string

    @ApiProperty({ example: true })
    published!: boolean

    @ApiProperty({ example: 'Company simplified name' })
    slug!: string

    @ApiProperty({
        example: 'Company short Description',
        nullable: true,
        type: String,
    })
    shortDescription: string | null

    @ApiProperty({
        example: 'Company Description',
        nullable: true,
        type: String,
    })
    description: string | null

    @ApiProperty({
        enum: CompanyType,
        example: CompanyType.HOTEL,
    })
    type: CompanyType

    @ApiProperty({
        example: 'Timezone',
        nullable: true,
        type: String,
    })
    timezone: string | null

    @ApiProperty({
        example: 'LogoURL',
        nullable: true,
        type: String,
    })
    logo: string | null

    @ApiProperty({
        example: 'Favicon',
        nullable: true,
        type: String,
    })
    favIcon: string | null

    @ApiProperty({ example: 'Person responsible' })
    responsible!: string

    @ApiProperty({
        example: 'Responsible email address',
        type: String,
    })
    responsibleEmail: string

    @ApiProperty({
        example: 'Responsible phone number',
        type: String,
    })
    responsiblePhone: string

    @ApiProperty({
        example: 'Document Type',
        nullable: true,
        type: String,
    })
    docType: string | null

    @ApiProperty({
        type: String,
        example: 'Responsible identification',
        nullable: true,
    })
    identification: string | null

    @ApiProperty({
        type: String,
        example: 'Company legal name',
        nullable: true,
    })
    companyName: string | null

    @ApiProperty({
        example: 'State registration',
        nullable: true,
        type: String,
    })
    stateRegistration: string | null

    @ApiProperty({
        example: 'Municipal registration',
        nullable: true,

        type: String,
    })
    municipalRegistration: string | null

    @ApiProperty({ example: 'Street', nullable: true, type: String })
    address: string | null

    @ApiProperty({ example: '88888-888', nullable: true, type: String })
    zipcode: string | null

    @ApiProperty({ example: 'Number', nullable: true, type: String })
    number: string | null

    @ApiProperty({ example: 'Country', nullable: true, type: String })
    country: string | null

    @ApiProperty({ example: 'State', nullable: true, type: String })
    state: string | null

    @ApiProperty({ example: 'City', nullable: true, type: String })
    city: string | null

    @ApiProperty({
        example: 'Privacy policy description',
        type: String,
    })
    privacyPolicyDescription: string | null

    @ApiProperty({
        example: 'Privacy policy simple model',
        type: String,
    })
    privacyPolicySimpleModel: string | null

    @ApiProperty({
        example: 'Privacy policy full model',
        type: String,
    })
    privacyPolicyFullModel: string | null

    @ApiProperty({
        example: 'Map Coordinates',
        type: MapCoordinatesDTO,
        nullable: true,
    })
    mapCoordinates: MapCoordinatesDTO | null

    @ApiProperty({ example: 'Banner Title', nullable: true, type: String })
    bannerTitle: string | null

    @ApiProperty({
        example: 'Banner Description',
        nullable: true,
        type: String,
    })
    bannerDescription: string | null

    @ApiProperty({
        example: 'Banner Image',
        type: MediaResponseDTO,
        nullable: true,
    })
    bannerImage: MediaResponseDTO | null

    @ApiProperty({
        example: 'Company Media',
        type: [CompanyMediaResponseDTO],
        nullable: true,
    })
    companyMedias: CompanyMediaResponseDTO[] | null
}
