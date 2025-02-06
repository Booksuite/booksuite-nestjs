import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { Role } from './'

export class User {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    email!: string

    @IsDefined()
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
    surName?: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsDefined()
    @IsString()
    password!: string

    @IsOptional()
    @IsString()
    confirmationCode?: string

    @IsOptional()
    @IsInt()
    roleId?: number

    @IsOptional()
    role?: Role

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
