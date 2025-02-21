import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import {
    IsDefined,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'

export class MediaDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    id?: string

    @ApiProperty({ example: 'https://example.com/image.jpg', required: true })
    @IsDefined()
    @IsString()
    url!: string

    @ApiProperty({
        example: { key: 'value' },
        required: false,
    })
    @IsObject()
    @IsOptional()
    metadata?: Prisma.InputJsonValue
}
