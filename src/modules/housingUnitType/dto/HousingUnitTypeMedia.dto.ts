import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDefined, IsInt, IsOptional } from 'class-validator'

import { MediaDTO } from '@/modules/media/dto/Media.dto'

export class HousingUnitTypeMediaDTO extends MediaDTO {
    @ApiProperty({ example: true })
    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean

    @ApiProperty({ example: 1, required: false })
    @IsOptional()
    @IsInt()
    order?: number
}
