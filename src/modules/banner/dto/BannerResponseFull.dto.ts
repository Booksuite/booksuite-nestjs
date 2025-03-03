import { ApiProperty } from '@nestjs/swagger'

import { BannerMediaResponseDTO } from './BannerMediaResponse.dto'
import { BannerResponseDTO } from './BannerResponse.dto'

export class BannerResponseFullDTO extends BannerResponseDTO {
    @ApiProperty({ type: [BannerMediaResponseDTO] })
    medias!: BannerMediaResponseDTO[]
}
