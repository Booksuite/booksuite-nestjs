import { IsDefined, IsOptional, IsString } from 'class-validator'

export class Address {
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
}
