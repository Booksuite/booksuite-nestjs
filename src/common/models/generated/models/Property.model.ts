import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import {
    Address,
    Book,
    Company,
    Contact,
    PaymentConfig,
    PropertyConvenience,
    PropertyMedia,
    Rule,
} from './'

export class Property {
    @IsDefined()
    @IsInt()
    id!: number

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
    addressId?: number

    @IsOptional()
    address?: Address

    @IsOptional()
    @IsInt()
    companyId?: number

    @IsOptional()
    company?: Company

    @IsDefined()
    medias!: PropertyMedia[]

    @IsDefined()
    conveniences!: PropertyConvenience[]

    @IsOptional()
    rules?: Rule

    @IsDefined()
    books!: Book[]

    @IsOptional()
    contact?: Contact

    @IsOptional()
    paymentConfig?: PaymentConfig

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
