import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'

import { MediaType } from '../enum/MediaType.enum'

export class MediaFilterDTO {
    @ApiProperty({ enum: MediaType, enumName: 'MediaType', required: false })
    @IsOptional()
    @IsEnum(MediaType)
    type?: MediaType
}
