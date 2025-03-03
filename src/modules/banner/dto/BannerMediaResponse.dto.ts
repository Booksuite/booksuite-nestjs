import { ApiProperty } from '@nestjs/swagger'

import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

export class BannerMediaResponseDTO {
    @ApiProperty({ example: 2, required: false })
    order?: number | null

    @ApiProperty({ type: MediaResponseDTO })
    media: MediaResponseDTO
}
