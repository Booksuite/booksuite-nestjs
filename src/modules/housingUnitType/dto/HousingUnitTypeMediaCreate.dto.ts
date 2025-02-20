import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

export class HousingUnitTypeMediaCreateDTO {
    @ApiProperty({
        example: 'true',
        description: 'It is part of one of the best features',
    })
    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean

    @ApiProperty({ example: '1' })
    @IsOptional()
    @IsInt()
    order?: number

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsString()
    propertyId!: string

    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsDefined()
    @IsString()
    mediaId!: string
}
