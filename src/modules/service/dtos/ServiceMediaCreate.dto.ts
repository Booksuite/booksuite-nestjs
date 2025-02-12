import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class ServiceMediaCreateDTO {
    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsString()
    serviceId!: string

    @IsDefined()
    @IsString()
    mediaId!: string
}
