import { ApiProperty } from '@nestjs/swagger'

export class HousingUnitResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ example: 'Luxury Apartment' })
    name: string

    @ApiProperty({ example: 1 })
    order: number

    @ApiProperty({ example: 'a12345b6-c789-012d-345e-67890fghijkl' })
    housingUnitTypeId: string

    @ApiProperty({ example: '2024-02-25T14:48:00.000Z' })
    createdAt: Date

    @ApiProperty({ example: '2024-02-25T14:48:00.000Z' })
    updatedAt: Date
}
