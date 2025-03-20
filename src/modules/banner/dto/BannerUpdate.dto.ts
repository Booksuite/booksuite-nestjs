import { ApiProperty } from '@nestjs/swagger'
import { BannerAction, BannerPosition } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { BannerMediaDTO } from './BannerMedia.dto'

export class BannerUpdateDTO {
    @ApiProperty({ example: 'Banner name', required: false, type: String })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: true, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({
        enum: BannerPosition,
        example: BannerPosition.HOME_TOP,
        required: false,
    })
    @IsOptional()
    @IsEnum(BannerPosition)
    position?: BannerPosition

    @ApiProperty({ example: 1, required: false, type: Number })
    @IsOptional()
    @IsInt()
    order?: number

    @ApiProperty({
        example: 'Banner title',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    title?: string | null

    @ApiProperty({
        example: 'Banner description',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    description?: string | null

    @ApiProperty({
        enum: BannerAction,
        example: BannerAction.SMART_SEARCH,
        required: false,
    })
    @IsOptional()
    @IsEnum(BannerAction)
    action?: BannerAction

    @ApiProperty({
        example: 'search',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    actionButtonText?: string | null

    @ApiProperty({
        example: 'https://via.placeholder.com',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsString()
    actionButtonLink?: string | null

    @ApiProperty({ type: [BannerMediaDTO], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BannerMediaDTO)
    medias?: BannerMediaDTO[]

    @ApiProperty({
        example: '2024-03-14T00:00:00Z',
        description: 'ISO format',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsISO8601()
    startAt?: string | null

    @ApiProperty({
        example: '2025-08-14T23:59:59Z',
        description: 'ISO format',
        required: false,
        nullable: true,
        type: String,
    })
    @IsOptional()
    @IsISO8601()
    endAt?: string | null
}
