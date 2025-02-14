import { IsDefined, IsOptional, IsString } from 'class-validator'

export class companyUpdateDTO {
    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    slug!: string

    @IsOptional()
    @IsString()
    shortDescription?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsString()
    branchBusiness?: string

    @IsOptional()
    @IsString()
    timezone?: string

    @IsOptional()
    @IsString()
    thumbnail?: string

    @IsOptional()
    @IsString()
    logo?: string

    @IsOptional()
    @IsString()
    logoFormat?: string

    @IsOptional()
    @IsString()
    favIcon?: string

    @IsOptional()
    @IsString()
    theme?: string

    @IsDefined()
    @IsString()
    responsible!: string

    @IsOptional()
    @IsString()
    responsibleEmail?: string

    @IsOptional()
    @IsString()
    responsiblePhone?: string

    @IsDefined()
    @IsString()
    docType!: string

    @IsDefined()
    @IsString()
    identification!: string

    @IsDefined()
    @IsString()
    companyName!: string

    @IsOptional()
    @IsString()
    stateRegistration?: string

    @IsOptional()
    @IsString()
    municipalRegistration?: string

    @IsDefined()
    @IsString()
    address!: string

    @IsDefined()
    @IsString()
    number!: string

    @IsDefined()
    @IsString()
    country!: string

    @IsDefined()
    @IsString()
    state!: string

    @IsDefined()
    @IsString()
    city!: string
}
