import { ApiProperty } from '@nestjs/swagger'

import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

export class SpecialDateMediaResponseDTO {
    @ApiProperty({ example: '8c8ab0cb-7689-4357-b446-1348cfe3842d' })
    id: string

    @ApiProperty({ example: 1, nullable: true, type: Number })
    order: number | null

    @ApiProperty({ type: MediaResponseDTO })
    media: MediaResponseDTO
}
