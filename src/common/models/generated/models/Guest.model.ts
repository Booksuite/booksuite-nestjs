import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { Book } from './'

export class Guest {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    email!: string

    @IsDefined()
    @IsString()
    phone!: string

    @IsOptional()
    @IsInt()
    bookId?: number

    @IsOptional()
    book?: Book

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
