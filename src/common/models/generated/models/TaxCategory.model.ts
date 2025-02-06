import { IsDate, IsDefined, IsInt } from 'class-validator'

import { Category, Tax } from './'

export class TaxCategory {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    taxId!: number

    @IsDefined()
    tax!: Tax

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
