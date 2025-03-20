import { ApiProperty } from '@nestjs/swagger'
import { CompanyType } from '@prisma/client'

import { MapCoordinatesDTO } from '@/common/dto/MapCoodinates.dto'
import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

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

    @ApiProperty({ example: 'Timezone', nullable: true, type: String })
    timezone: string | null

    @ApiProperty({ example: 'LogoURL', nullable: true, type: String })
    logo: string | null

    @ApiProperty({ example: 'Favicon', nullable: true, type: String })
    favIcon: string | null

    @ApiProperty({ example: 'Person responsible' })
    responsible!: string

    @ApiProperty({
        example: 'Responsible email address',
        nullable: true,
        type: String,
    })
    responsibleEmail: string | null

    @ApiProperty({
        example: 'Responsible phone number',
        nullable: true,
        type: String,
    })
    responsiblePhone: string | null

    @ApiProperty({ example: 'Document Type' })
    docType!: string

    @ApiProperty({ example: 'Responsible identification' })
    identification!: string

    @ApiProperty({ example: 'Company legal name' })
    companyName!: string

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

    @ApiProperty({ example: 'Street' })
    address!: string

    @ApiProperty({ example: '88888-888' })
    zipcode!: string

    @ApiProperty({ example: 'Number' })
    number!: string

    @ApiProperty({ example: 'Country' })
    country!: string

    @ApiProperty({ example: 'State' })
    state!: string

    @ApiProperty({ example: 'City' })
    city!: string

    @ApiProperty({ example: 'Map Coordinates', type: MapCoordinatesDTO })
    mapCoordinates!: MapCoordinatesDTO

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
}
