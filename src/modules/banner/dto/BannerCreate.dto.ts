import { ApiProperty } from '@nestjs/swagger'
import { BannerAction, BannerPosition } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsEnum,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { BannerMediaDTO } from './BannerMedia.dto'

export class BannerCreateDTO {
    @ApiProperty({ example: 'Banner name' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    published: boolean

    @ApiProperty({
        enum: BannerPosition,
        enumName: 'BannerPosition',
        example: BannerPosition.HOME_TOP,
    })
    @IsDefined()
    @IsEnum(BannerPosition)
    position!: BannerPosition

    @ApiProperty({ example: 1 })
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

    @ApiProperty({
        enum: BannerAction,
        enumName: 'BannerAction',
        example: BannerAction.SMART_SEARCH,
    })
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

    @ApiProperty({ type: [BannerMediaDTO] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BannerMediaDTO)
    @IsDefined()
    medias!: BannerMediaDTO[]

    @ApiProperty({
        example: '2024-03-14T00:00:00Z',
        description: 'ISO format',
        required: false,
    })
    @IsOptional()
    @IsISO8601()
    startAt?: string

    @ApiProperty({
        example: '2025-08-14T23:59:59Z',
        description: 'ISO format',
        required: false,
    })
    @IsOptional()
    @IsISO8601()
    endAt?: string
}
