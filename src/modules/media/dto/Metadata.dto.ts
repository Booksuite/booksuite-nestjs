import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

import { MediaMetadata } from '@/modules/company/types/json'

export class MetadataDto implements MediaMetadata {
    readonly [x: string]: string

    @ApiProperty({
        example: 'image/png',
    })
    @IsString()
    @IsDefined()
    mimetype: string
}
