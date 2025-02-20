import { IsDefined, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class BannerMediaDTO {
    @IsOptional()
    @IsUUID()
    id?: string

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsString()
    bannerId!: string

    @IsDefined()
    @IsString()
    mediaId!: string
}
