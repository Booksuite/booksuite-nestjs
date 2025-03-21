import { ApiProperty } from '@nestjs/swagger'
import { BannerAction, BannerPosition } from '@prisma/client'

export class BannerResponseDTO {
    @ApiProperty({ example: 'a89f8dc0-4d03-483a-8803-9c4a4c2ab878' })
    id!: string

    @ApiProperty({ example: true })
    published: boolean

    @ApiProperty({ example: 'Banner name' })
    name!: string

    @ApiProperty({
        enum: BannerPosition,
        enumName: 'BannerPosition',
        example: BannerPosition.HOME_TOP,
    })
    position!: BannerPosition

    @ApiProperty({ example: 1, type: Number, nullable: true })
    order!: number | null

    @ApiProperty({ example: 'Banner title', nullable: true, type: String })
    title: string | null

    @ApiProperty({
        example: 'Banner description',
        nullable: true,
        type: String,
    })
    description: string | null

    @ApiProperty({
        enum: BannerAction,
        enumName: 'BannerAction',
        example: BannerAction.SMART_SEARCH,
    })
    action!: BannerAction

    @ApiProperty({ example: 'search', nullable: true, type: String })
    actionButtonText: string | null

    @ApiProperty({
        example: 'https://via.placeholder.com',
        nullable: true,
        type: String,
    })
    actionButtonLink: string | null

    @ApiProperty({
        example: '2024-03-14T00:00:00Z',
        type: String,
        format: 'date-time',
        nullable: true,
    })
    startAt: Date | null

    @ApiProperty({
        example: '2025-08-14T23:59:59Z',
        type: String,
        format: 'date-time',
        nullable: true,
    })
    endAt: Date | null
}
