import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class BannerMediaDTO {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsOptional()
    @IsUUID()
    id?: string

    @ApiProperty({ example: 'order number', required: false })
    @IsOptional()
    @IsInt()
    order?: number

    @ApiProperty({ example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' })
    @IsDefined()
    @IsString()
    bannerId!: string

    @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
    @IsDefined()
    @IsString()
    mediaId!: string
}
