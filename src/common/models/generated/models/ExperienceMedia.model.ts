import { IsDate, IsDefined, IsInt, IsOptional } from 'class-validator'

import { Experience, Media } from './'

export class ExperienceMedia {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsInt()
    experienceId!: number

    @IsDefined()
    experience!: Experience

    @IsDefined()
    @IsInt()
    mediaId!: number

    @IsDefined()
    media!: Media

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
