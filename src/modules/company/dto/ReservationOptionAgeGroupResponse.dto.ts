import { ApiProperty } from '@nestjs/swagger'

import { AgeGroupDTO } from './AgeGroup.dto'

export class ReservationOptionAgeGroupResponseDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
    })
    id: string

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
    })
    ageGroup: AgeGroupDTO

    @ApiProperty({ example: 30.0, type: Number })
    price: number
}
