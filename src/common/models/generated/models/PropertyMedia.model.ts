import { IsDate, IsDefined, IsInt, IsOptional } from 'class-validator'

import { Media, Property } from './'

export class PropertyMedia {
    @IsDefined()
    @IsInt()
    id!: number

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsInt()
    propertyId!: number

    @IsDefined()
    property!: Property

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
