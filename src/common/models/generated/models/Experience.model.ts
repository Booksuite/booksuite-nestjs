import { Prisma } from '@prisma/client'
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import {
    BookExperience,
    ExperienceCategory,
    ExperienceExtra,
    ExperienceMedia,
    OfferExtraExperience,
} from './'

export class Experience {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsOptional()
    @IsString()
    status?: string

    @IsDefined()
    @IsInt()
    minDaily!: number

    @IsDefined()
    @IsInt()
    minNotice!: number

    @IsDefined()
    @IsBoolean()
    onlineSale!: boolean

    @IsDefined()
    @IsBoolean()
    panelSale!: boolean

    @IsDefined()
    @IsBoolean()
    seasonalSale!: boolean

    @IsDefined()
    @IsDate()
    seasonStart!: Date

    @IsDefined()
    @IsDate()
    seasonEnd!: Date

    @IsOptional()
    hosting?: Prisma.JsonValue

    @IsOptional()
    nights?: Prisma.JsonValue

    @IsDefined()
    @IsString()
    description!: string

    @IsDefined()
    @IsString()
    notes!: string

    @IsOptional()
    @IsString()
    videoUrl?: string

    @IsDefined()
    price!: number

    @IsOptional()
    @IsString()
    priceAdjustment?: string

    @IsDefined()
    discount!: number

    @IsDefined()
    @IsString()
    billType!: string

    @IsDefined()
    categories!: ExperienceCategory[]

    @IsDefined()
    medias!: ExperienceMedia[]

    @IsDefined()
    extras!: ExperienceExtra[]

    @IsDefined()
    books!: BookExperience[]

    @IsDefined()
    offers!: OfferExtraExperience[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
