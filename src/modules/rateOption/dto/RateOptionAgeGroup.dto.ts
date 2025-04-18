import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsString } from 'class-validator'

export class RateOptionAgeGroupDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
    })
    @IsDefined()
    @IsString()
    ageGroupId!: string

    @ApiProperty({ example: 30.0, type: Number })
    @IsDefined()
    @IsNumber()
    price!: number
}
