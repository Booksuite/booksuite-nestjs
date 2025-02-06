import { Prisma } from '@prisma/client'
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { OfferCategory, OfferExtraExperience } from './'

export class Offer {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
    description?: string

    @IsDefined()
    @IsDate()
    startAt!: Date

    @IsDefined()
    @IsDate()
    endAt!: Date

    @IsOptional()
    hosting?: Prisma.JsonValue

    @IsDefined()
    paymentTypes!: Prisma.JsonValue

    @IsDefined()
    nights!: Prisma.JsonValue

    @IsDefined()
    @IsString()
    priceVariationType!: string

    @IsDefined()
    priceVariation!: number

    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean

    @IsDefined()
    @IsBoolean()
    disccountTag!: boolean

    @IsDefined()
    @IsBoolean()
    couponExclusive!: boolean

    @IsOptional()
    @IsString()
    coupon?: string

    @IsDefined()
    categories!: OfferCategory[]

    @IsDefined()
    extrasExperiences!: OfferExtraExperience[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
