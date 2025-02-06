import { IsDate, IsDefined, IsInt, IsOptional } from 'class-validator'

import { Extra, Media } from './'

export class ExtraMedia {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsInt()
    extraId!: number

    @IsDefined()
    extra!: Extra

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
