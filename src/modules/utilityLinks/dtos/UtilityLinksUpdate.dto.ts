import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UtilityLinksUpdateDTO {
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({ example: 'Our Story' })
    @IsOptional()
    @IsString()
    title?: string

    @ApiProperty({ example: 'https://example.com/about-us' })
    @IsOptional()
    @IsString()
    buttonLink?: string

    @ApiProperty({
        example: '2025-01-01T00:00:00.000Z',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    startDate?: Date | null

    @ApiProperty({
        example: '2025-12-31T23:59:59.999Z',
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    endDate?: Date | null
}
