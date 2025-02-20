import {
    IsBoolean,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

import { MediaCreateDTO } from '@/modules/media/dto/MediaCreate.dto'

export class HousingUnitTypeMediaCreateDTO {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsString()
    propertyId!: string

    @IsDefined()
    @IsString()
    mediaId!: string

    @IsDefined()
    media!: MediaCreateDTO
}
