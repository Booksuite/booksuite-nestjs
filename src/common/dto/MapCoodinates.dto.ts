import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

import { MapCoordinates } from '../types/json'

export class MapCoordinatesDTO implements MapCoordinates {
    @ApiProperty({
        type: Number,
        description: 'Latitude',
        example: 123.456,
    })
    @IsNumber()
    @IsNotEmpty()
    latitude: number

    @ApiProperty({
        type: Number,
        description: 'Longitude',
        example: 123.456,
    })
    @IsNumber()
    @IsNotEmpty()
    longitude: number
}
