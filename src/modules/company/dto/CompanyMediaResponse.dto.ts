import { ApiProperty } from '@nestjs/swagger'

import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

export class CompanyMediaResponseDTO {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string

    @ApiProperty({ example: true })
    isFeatured!: boolean

    @ApiProperty({ example: 1, nullable: true, type: Number })
    order: number | null

    @ApiProperty({ type: MediaResponseDTO })
    media: MediaResponseDTO
}
