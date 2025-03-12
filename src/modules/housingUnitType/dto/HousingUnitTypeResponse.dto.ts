import { ApiProperty } from '@nestjs/swagger'

export class HousingUnitTypeResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ example: 'Deluxe' })
    name!: string

    @ApiProperty({ example: 'deluxe-suite' })
    slug!: string

    @ApiProperty({
        example: 'a deluxe suite for 2 people',
        type: String,
        nullable: true,
    })
    shortDescription: string | null

    @ApiProperty({
        example:
            'The Deluxe Suite offers a spacious room with a king-size bed, a private balcony, and premium amenities.',
        type: String,
        nullable: true,
    })
    description: string | null

    @ApiProperty({ example: 2, type: Number })
    order!: number

    @ApiProperty({ example: 2, type: Number, nullable: true })
    minGuests: number | null

    @ApiProperty({ example: 6, type: Number, nullable: true })
    maxGuests: number | null

    @ApiProperty({ example: 4, type: Number, nullable: true })
    maxAdults: number | null

    @ApiProperty({ example: 3, type: Number, nullable: true })
    maxChildren: number | null

    @ApiProperty({ example: 300, type: Number, nullable: true })
    weekdaysPrice!: number | null

    @ApiProperty({ example: 500, type: Number, nullable: true })
    weekendPrice!: number | null

    @ApiProperty({ example: 50, type: Number, nullable: true })
    extraAdultPrice!: number | null

    @ApiProperty({ example: 70, type: Number })
    chargeExtraAdultHigherThan!: number

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    createdAt: Date

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
    updatedAt: Date
}
