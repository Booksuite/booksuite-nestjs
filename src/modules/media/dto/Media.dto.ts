import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsDefined,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator'

import { MetadataDto } from './Metadata.dto'

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

    @ApiProperty({ type: MetadataDto })
    @Type(() => MetadataDto)
    @IsDefined()
    @ValidateNested({ each: true })
    metadata: MetadataDto
}
