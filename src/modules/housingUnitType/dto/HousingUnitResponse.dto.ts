import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsDefined, IsString, IsUUID } from 'class-validator'

export class HousingUnitResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    @IsDefined()
    @IsUUID()
    id: string

    @ApiProperty({ example: 'Luxury Apartment' })
    @IsDefined()
    @IsString()
    name: string

    @ApiProperty({ example: 'a12345b6-c789-012d-345e-67890fghijkl' })
    @IsDefined()
    @IsUUID()
    housingUnitTypeId: string

    @ApiProperty({ example: '2024-02-25T14:48:00.000Z' })
    @IsDefined()
    @IsDate()
    createdAt: Date
}
