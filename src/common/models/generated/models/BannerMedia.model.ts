import { IsDefined, IsString } from 'class-validator'

import { Banner, Media } from './'

export class BannerMedia {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    bannerId!: string

    @IsDefined()
    banner!: Banner

    @IsDefined()
    @IsString()
    mediaId!: string

    @IsDefined()
    media!: Media
}
