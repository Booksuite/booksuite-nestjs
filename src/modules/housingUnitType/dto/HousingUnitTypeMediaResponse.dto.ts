import { ApiProperty } from '@nestjs/swagger'

import { MediaResponseDTO } from '@/modules/media/dto/MediaResponse.dto'

export class HousingUnitTypeMediaResponseDTO {
    @ApiProperty({ example: true })
    isFeatured!: boolean

    @ApiProperty({ example: 1 })
    order: number | null

    @ApiProperty({ type: MediaResponseDTO })
    media: MediaResponseDTO
}
