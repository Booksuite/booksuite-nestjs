import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class Guest {
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
}
