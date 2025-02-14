import {
    IsDate,
    IsDefined,
    IsIn,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { BannerAction, BannerPosition, BannerStatus } from '../enums'
import { getEnumValues } from '../helpers'

import { BannerMedia } from './'

export class Banner {
    @IsDefined()
    @IsString()
    id!: string

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
    BannerMedia!: BannerMedia[]

    @IsOptional()
    @IsDate()
    startAt?: Date

    @IsOptional()
    @IsDate()
    endAt?: Date

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
