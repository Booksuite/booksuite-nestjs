import { Type } from 'class-transformer'
import {
    IsArray,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { HousingUnitTypeMedia } from '@/common/models/generated/models'

import { HousingUnitTypeMediaCreateDTO } from './HousingUnitTypeMediaCreate.dto'

export class HousingUnitTypeCreateDTO {
    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    slug!: string

    @IsOptional()
    @IsString()
    shortDescription?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsDefined()
    @IsInt()
    order!: number

    @IsOptional()
    @IsInt()
    minGuests?: number

    @IsOptional()
    @IsInt()
    maxGuests?: number

    @IsOptional()
    @IsInt()
    maxAdults?: number

    @IsOptional()
    @IsInt()
    maxChildren?: number

    @IsDefined()
    weekdaysPrice!: number

    @IsDefined()
    weekendPrice!: number

    @IsDefined()
    extraAdultPrice!: number

    @IsDefined()
    @IsInt()
    chargeExtraAdultHigherThan!: number

    @IsDefined()
    @IsString()
    companyId!: string

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => HousingUnitTypeMedia)
    medias?: HousingUnitTypeMediaCreateDTO[]
}
