import { ApiProperty } from '@nestjs/swagger'
import {
    IsDefined,
    IsEnum,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
} from 'class-validator'

import { BannerAction } from '../enum/BannerAction.enum'
import { BannerPosition } from '../enum/BannerPosition.enum'
import { BannerStatus } from '../enum/BannerStatus.enum'

import { BannerMediaDTO } from './BannerMedia.dto'

export class BannerCreateDTO {
    @ApiProperty({ example: 'BannerStatus.Enabled' })
    @IsDefined()
    @IsEnum(BannerStatus)
    status!: BannerStatus

    @ApiProperty({ example: 'Banner name' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'BannerPosition.HOME_TOP' })
    @IsDefined()
    @IsEnum(BannerPosition)
    position!: BannerPosition

    @ApiProperty({ example: 'order number' })
    @IsDefined()
    @IsInt()
    order!: number

    @ApiProperty({ example: 'Banner title', required: false })
    @IsOptional()
    @IsString()
    title?: string

    @ApiProperty({ example: 'Banner description', required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ example: 'BannerAction.SMART_SEARCH' })
    @IsDefined()
    @IsEnum(BannerAction)
    action!: BannerAction

    @ApiProperty({ example: 'search', required: false })
    @IsOptional()
    @IsString()
    actionButtonText?: string

    @ApiProperty({ example: 'https://via.placeholder.com', required: false })
    @IsOptional()
    @IsString()
    actionButtonLink?: string

    @ApiProperty({ type: BannerMediaDTO })
    @IsDefined()
    medias!: BannerMediaDTO[]

    @ApiProperty({ example: '14/06/2025' })
    @IsOptional()
    @IsISO8601()
    startAt?: string

    @ApiProperty({ example: '14/08/2025' })
    @IsOptional()
    @IsISO8601()
    endAt?: string
}
