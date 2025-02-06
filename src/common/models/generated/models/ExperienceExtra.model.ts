import { IsDefined, IsInt } from 'class-validator'

import { Experience, Extra } from './'

export class ExperienceExtra {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    qtd!: number

    @IsDefined()
    @IsInt()
    extraId!: number

    @IsDefined()
    extra!: Extra

    @IsDefined()
    @IsInt()
    experienceId!: number

    @IsDefined()
    experience!: Experience
}
