import { ApiProperty } from '@nestjs/swagger'

export class CompanyResponseDTO {
    @ApiProperty({ example: 'Company name' })
    name!: string

    @ApiProperty({ example: 'Company simplified name' })
    slug!: string

    @ApiProperty({ example: 'Company short Description', required: false })
    shortDescription?: string | null

    @ApiProperty({ example: 'Company Description', required: false })
    description?: string | null

    @ApiProperty({ example: 'Timezone', required: false })
    timezone?: string | null

    @ApiProperty({ example: 'LogoURL', required: false })
    logo?: string | null

    @ApiProperty({ example: 'Favicon', required: false })
    favIcon?: string | null

    @ApiProperty({ example: 'Person responsible' })
    responsible!: string

    @ApiProperty({ example: 'Responsible email address', required: false })
    responsibleEmail?: string | null

    @ApiProperty({ example: 'Responsible phone number', required: false })
    responsiblePhone?: string | null

    @ApiProperty({ example: 'Document Type' })
    docType!: string

    @ApiProperty({ example: 'Responsible identification' })
    identification!: string

    @ApiProperty({ example: 'Company legal name' })
    companyName!: string

    @ApiProperty({ example: 'State registration', required: false })
    stateRegistration?: string | null

    @ApiProperty({ example: 'Municipal registration', required: false })
    municipalRegistration?: string | null

    @ApiProperty({ example: 'Street' })
    address!: string

    @ApiProperty({ example: 'Number' })
    number!: string

    @ApiProperty({ example: 'Country' })
    country!: string

    @ApiProperty({ example: 'State' })
    state!: string

    @ApiProperty({ example: 'City' })
    city!: string
}
