import { IsDefined, IsIn, IsInt, IsOptional, IsString } from 'class-validator'

import { getEnumValues } from '@/common/models/generated/helpers'
import { BannerAction } from '../enum/BannerAction.enum'
import { BannerPosition } from '../enum/BannerPosition.enum'
import { BannerStatus } from '../enum/BannerStatus.enum'

import { BannerMediaCreateDTO } from './BannerMediaCreate.dto'

export class BannerCreateDTO {
    @IsDefined()
    @IsIn(getEnumValues(BannerStatus))
    status!: BannerStatus

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsIn(getEnumValues(BannerPosition))
    position!: BannerPosition

    @IsDefined()
    @IsInt()
    order!: number

    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsDefined()
    @IsIn(getEnumValues(BannerAction))
    action!: BannerAction

    @IsOptional()
    @IsString()
    actionButtonText?: string

    @IsOptional()
    @IsString()
    actionButtonLink?: string

    @IsDefined()
    BannerMedia!: BannerMediaCreateDTO[]

    @IsOptional()
    @IsString()
    startAt?: Date

    @IsOptional()
    @IsString()
    endAt?: Date
}
