import {
    IsBoolean,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

export class HousingUnitTypeMediaCreateDTO {
    @IsDefined()
    @IsBoolean()
    isFeatured!: boolean

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsString()
    mediaId!: string
}
