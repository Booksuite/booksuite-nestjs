import { IsDate, IsDefined, IsInt } from 'class-validator'

import { Category, Offer } from './'

export class OfferCategory {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    taxId!: number

    @IsDefined()
    tax!: Offer

    @IsDefined()
    @IsInt()
    categoryId!: number

    @IsDefined()
    category!: Category

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
