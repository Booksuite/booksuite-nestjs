import { Prisma } from '@prisma/client'
import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator'

import { Company } from './'

export class CompanyContact {
    @IsDefined()
    @IsString()
    id!: string

    @IsOptional()
    email?: Prisma.JsonValue

    @IsOptional()
    @IsString()
    salesPhone?: string

    @IsOptional()
    @IsString()
    guestsPhone?: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    cellphone?: string

    @IsOptional()
    otherPhones?: Prisma.JsonValue

    @IsOptional()
    @IsString()
    instagram?: string

    @IsOptional()
    @IsString()
    facebook?: string

    @IsOptional()
    @IsString()
    youtube?: string

    @IsOptional()
    @IsString()
    tiktok?: string

    @IsOptional()
    @IsString()
    tripAdvisor?: string

    @IsOptional()
    otherSocialMedias?: Prisma.JsonValue

    @IsDefined()
    @IsString()
    companyId!: string

    @IsDefined()
    company!: Company

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
