import { IsDefined, IsInt, IsString } from 'class-validator'

import {
    ExperienceCategory,
    ExtraCategory,
    OfferCategory,
    TaxCategory,
} from './'

export class Category {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    extras!: ExtraCategory[]

    @IsDefined()
    experiences!: ExperienceCategory[]

    @IsDefined()
    taxes!: TaxCategory[]

    @IsDefined()
    offers!: OfferCategory[]
}
