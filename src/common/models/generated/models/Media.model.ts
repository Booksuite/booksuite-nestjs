import { IsDate, IsDefined, IsInt, IsString } from 'class-validator'

import { ExperienceMedia, ExtraMedia, PropertyMedia } from './'

export class Media {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    image!: string

    @IsDefined()
    property!: PropertyMedia[]

    @IsDefined()
    extraMedias!: ExtraMedia[]

    @IsDefined()
    experienceMedias!: ExperienceMedia[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
