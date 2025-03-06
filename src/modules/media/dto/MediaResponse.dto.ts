import { ApiProperty } from '@nestjs/swagger'

import { MetadataDto } from './Metadata.dto'

export class MediaResponseDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string

    @ApiProperty({ example: 'https://example.com/image.jpg' })
    url!: string

    @ApiProperty({ example: '55fa1f18-4cd0-47cb-81ac-414d96e16f3c' })
    companyId!: string

    @ApiProperty({ type: MetadataDto })
    metadata: MetadataDto
}
