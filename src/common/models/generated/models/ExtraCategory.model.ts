import { IsDefined, IsInt, IsOptional } from 'class-validator'

import { Category, Extra } from './'

export class ExtraCategory {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    @IsInt()
    extraId?: number

    @IsOptional()
    extra?: Extra

    @IsDefined()
    @IsInt()
    categoryId!: number

    @IsDefined()
    category!: Category
}
