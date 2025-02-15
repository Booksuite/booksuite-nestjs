import { Prisma } from '@prisma/client'
import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator'

export class UserCreateDTO {
    @IsDefined()
    @IsEmail()
    email!: string

    @IsDefined()
    @IsString()
    firstName!: string

    @IsOptional()
    @IsString()
    lastName?: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsDefined()
    @IsString()
    password!: string

    // @IsDefined()
    // @IsBoolean()
    // isAdmin!: boolean

    @IsOptional()
    metaData?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue
}
