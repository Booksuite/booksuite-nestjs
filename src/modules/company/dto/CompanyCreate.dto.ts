import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsOptional, IsString } from 'class-validator'

export class CompanyCreateDTO {
    @ApiProperty({ example: 'Company name' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'Company simplified name' })
    @IsDefined()
    @IsString()
    slug!: string

    @ApiProperty({ example: 'Company short Description' })
    @IsOptional()
    @IsString()
    shortDescription?: string

    @ApiProperty({ example: 'Company Description' })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ example: 'Timezone' })
    @IsOptional()
    @IsString()
    timezone?: string

    @IsOptional()
    @IsString()
    thumbnail?: string

    @ApiProperty({ example: 'LogoURL' })
    @IsOptional()
    @IsString()
    logo?: string

    @IsOptional()
    @IsString()
    logoFormat?: string

    @ApiProperty({ example: 'Favicon' })
    @IsOptional()
    @IsString()
    favIcon?: string

    @IsOptional()
    @IsString()
    theme?: string

    @ApiProperty({ example: 'Person resposible' })
    @IsDefined()
    @IsString()
    responsible!: string

    @ApiProperty({ example: 'Resposible email address' })
    @IsOptional()
    @IsString()
    responsibleEmail?: string

    @ApiProperty({ example: 'Resposible phone number' })
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

    @ApiProperty({ example: 'State registration' })
    @IsOptional()
    @IsString()
    stateRegistration?: string

    @ApiProperty({ example: 'Municipal registration' })
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

    @ApiProperty({ example: 'City' })
    @IsDefined()
    @IsString()
    city!: string
}
