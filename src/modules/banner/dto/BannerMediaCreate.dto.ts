import { IsDefined, IsString } from 'class-validator'

export class BannerMediaCreateDTO {
    @IsDefined()
    @IsString()
    bannerId!: string

    @IsDefined()
    @IsString()
    mediaId!: string
}
