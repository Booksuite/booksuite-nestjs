import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional } from 'class-validator'

import { MediaDTO } from '@/modules/media/dto/Media.dto'

export class BannerMediaDTO extends MediaDTO {
    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    @IsInt()
    order?: number
}
