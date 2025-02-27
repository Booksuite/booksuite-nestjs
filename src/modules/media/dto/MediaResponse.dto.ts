import { ApiProperty } from '@nestjs/swagger'

import { MetadataDto } from './Metadata.dto'

export class MediaResponseDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string

    @ApiProperty({ example: 'https://example.com/image.jpg' })
    url!: string

    @ApiProperty({ type: MetadataDto })
    metadata: MetadataDto
}
