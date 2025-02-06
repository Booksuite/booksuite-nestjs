import { Prisma } from '@prisma/client'
import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { Property } from './'

export class Contact {
    @IsDefined()
    @IsInt()
    id!: number

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
    @IsInt()
    propertyId!: number

    @IsDefined()
    property!: Property

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
