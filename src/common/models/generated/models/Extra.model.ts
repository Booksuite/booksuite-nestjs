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
    BookExtra,
    ExperienceExtra,
    ExtraCategory,
    ExtraMedia,
    OfferExtraExperience,
} from './'

export class Extra {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    billType!: string

    @IsDefined()
    price!: number

    @IsDefined()
    @IsInt()
    adults!: number

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
    included!: string

    @IsDefined()
    @IsString()
    notes!: string

    @IsOptional()
    @IsString()
    videoUrl?: string

    @IsDefined()
    categories!: ExtraCategory[]

    @IsDefined()
    medias!: ExtraMedia[]

    @IsDefined()
    books!: BookExtra[]

    @IsDefined()
    experiences!: ExperienceExtra[]

    @IsDefined()
    offers!: OfferExtraExperience[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
