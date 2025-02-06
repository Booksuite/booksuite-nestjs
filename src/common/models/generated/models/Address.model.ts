import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { Property } from './'

export class Address {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    @IsString()
    zipCode?: string

    @IsDefined()
    @IsString()
    street!: string

    @IsOptional()
    @IsString()
    number?: string

    @IsDefined()
    @IsString()
    country!: string

    @IsDefined()
    @IsString()
    state!: string

    @IsDefined()
    @IsString()
    city!: string

    @IsOptional()
    @IsString()
    googleMapsUrl?: string

    @IsOptional()
    property?: Property

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
