import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsDateString,
    IsDefined,
    IsOptional,
    IsString,
} from 'class-validator'

export class UtilityLinksDTO {
    @ApiProperty({ example: true, type: Boolean })
    @IsDefined()
    @IsBoolean()
    published: boolean

    @ApiProperty({ example: 'Our Story', type: String })
    @IsDefined()
    @IsString()
    title: string

    @ApiProperty({ example: 'https://example.com/about-us', type: String })
    @IsDefined()
    @IsString()
    buttonLink: string

    @ApiProperty({
        example: '2025-01-01T00:00:00.000Z',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    startDate?: string

    @ApiProperty({
        example: '2025-12-31T23:59:59.999Z',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsDateString()
    endDate?: string
}
