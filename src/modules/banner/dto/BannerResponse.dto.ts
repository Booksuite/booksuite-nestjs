import { ApiProperty } from '@nestjs/swagger'
import { BannerAction, BannerPosition } from '@prisma/client'

export class BannerResponseDTO {
    @ApiProperty({ example: 'a89f8dc0-4d03-483a-8803-9c4a4c2ab878' })
    id!: string

    @ApiProperty({ example: true })
    published: boolean

    @ApiProperty({ example: 'Banner name' })
    name!: string

    @ApiProperty({ enum: BannerPosition, example: BannerPosition.HOME_TOP })
    position!: BannerPosition

    @ApiProperty({ example: 1 })
    order!: number | null

    @ApiProperty({ example: 'Banner title', required: false })
    title?: string | null

    @ApiProperty({ example: 'Banner description', required: false })
    description?: string | null

    @ApiProperty({ enum: BannerAction, example: BannerAction.SMART_SEARCH })
    action!: BannerAction

    @ApiProperty({ example: 'search', required: false })
    actionButtonText?: string | null

    @ApiProperty({ example: 'https://via.placeholder.com', required: false })
    actionButtonLink?: string | null

    @ApiProperty({
        example: '2024-03-14T00:00:00Z',
        description: 'ISO format',
        required: false,
    })
    startAt?: Date | null

    @ApiProperty({
        example: '2025-08-14T23:59:59Z',
        description: 'ISO format',
        required: false,
    })
    endAt?: Date | null
}
