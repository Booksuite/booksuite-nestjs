import { ApiProperty } from '@nestjs/swagger'

export class UtilityLinksResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id?: string

    @ApiProperty({ example: true })
    published!: boolean

    @ApiProperty({ example: 'Our Story' })
    title!: string

    @ApiProperty({ example: 'https://example.com/about-us' })
    buttonLink!: string

    @ApiProperty({
        example: '2025-01-01T00:00:00.000Z',
        required: false,
        nullable: true,
        type: Date,
    })
    startDate?: Date | null

    @ApiProperty({
        example: '2025-12-31T23:59:59.999Z',
        required: false,
        nullable: true,
        type: Date,
    })
    endDate?: Date | null
}
