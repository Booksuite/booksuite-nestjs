import { IsDefined, IsInt } from 'class-validator'

import { Category, Experience } from './'

export class ExperienceCategory {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    experienceId!: number

    @IsDefined()
    experience!: Experience

    @IsDefined()
    @IsInt()
    categoryId!: number

    @IsDefined()
    category!: Category
}
