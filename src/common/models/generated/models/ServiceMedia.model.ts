import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { Media, Service } from './'

export class ServiceMedia {
    @IsDefined()
    @IsString()
    id!: string

    @IsOptional()
    @IsInt()
    order?: number

    @IsDefined()
    @IsString()
    serviceId!: string

    @IsDefined()
    sevice!: Service

    @IsDefined()
    @IsString()
    mediaId!: string

    @IsDefined()
    media!: Media

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
