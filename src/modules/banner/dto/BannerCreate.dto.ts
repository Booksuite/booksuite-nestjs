import { IsDefined, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'

import { BannerAction } from '../enum/BannerAction.enum'
import { BannerPosition } from '../enum/BannerPosition.enum'
import { BannerStatus } from '../enum/BannerStatus.enum'

import { BannerMediaCreateDTO } from './BannerMediaCreate.dto'

export class BannerCreateDTO {
    @IsDefined()
    @IsEnum(BannerStatus)
    status!: BannerStatus

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsEnum(BannerPosition)
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
    @IsEnum(BannerAction)
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
