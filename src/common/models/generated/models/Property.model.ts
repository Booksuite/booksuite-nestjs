import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class Property {
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
    @IsInt()
    avaiableGuests?: number

    @IsOptional()
    @IsInt()
    minGuests?: number

    @IsOptional()
    @IsInt()
    maxGuests?: number

    @IsOptional()
    @IsInt()
    maxAdults?: number

    @IsOptional()
    @IsInt()
    maxChildren?: number

    @IsDefined()
    weekdaysPrice!: number

    @IsDefined()
    weekendPrice!: number

    @IsDefined()
    extraAdultPrice!: number

    @IsDefined()
    @IsInt()
    extraAdultPriceQtd!: number

    @IsOptional()
    @IsString()
    banner?: string

    @IsOptional()
    @IsString()
    videoUrl?: string

    @IsOptional()
    @IsInt()
    addressId: number

    @IsOptional()
    @IsInt()
    companyId?: number
}
