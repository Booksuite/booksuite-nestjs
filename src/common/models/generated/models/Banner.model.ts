import './'

import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class Banner {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    status!: string

    @IsDefined()
    @IsString()
    identification!: string

    @IsDefined()
    @IsString()
    position!: string

    @IsDefined()
    @IsString()
    title!: string

    @IsDefined()
    @IsString()
    description!: string

    @IsDefined()
    @IsString()
    actionButton!: string

    @IsOptional()
    @IsString()
    actionButtonText?: string

    @IsOptional()
    @IsString()
    actionButtonLink?: string

    @IsDefined()
    @IsString()
    bannerFormat!: string

    @IsOptional()
    @IsString()
    bannerImage?: string

    @IsOptional()
    @IsString()
    bannerVideoUrl?: string

    @IsDefined()
    @IsDate()
    startAt!: Date

    @IsDefined()
    @IsDate()
    endAt!: Date

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
