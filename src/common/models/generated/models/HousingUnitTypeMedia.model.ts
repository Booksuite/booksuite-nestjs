import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { HousingUnitType, Media } from './'

export class HousingUnitTypeMedia {
    @IsDefined()
    @IsString()
    id!: string

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean

    @IsDefined()
    @IsString()
    propertyId!: string

    @IsDefined()
    property!: HousingUnitType

    @IsDefined()
    @IsString()
    mediaId!: string

    @IsDefined()
    media!: Media

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
