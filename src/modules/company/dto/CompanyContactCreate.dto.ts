import { Prisma } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'

export class CompanyContactCreateDTO {
    @IsOptional()
    email?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput

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
    otherPhones?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput

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
    otherSocialMedias?:
        | Prisma.InputJsonValue
        | Prisma.NullableJsonNullValueInput
}
