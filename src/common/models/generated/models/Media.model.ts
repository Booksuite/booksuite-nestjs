import { Prisma } from '@prisma/client'
import { IsDate, IsDefined, IsOptional, IsString } from 'class-validator'

import { BannerMedia, HousingUnitTypeMedia, ServiceMedia } from './'

export class Media {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    url!: string

    @IsOptional()
    metadata?: Prisma.JsonValue

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date

    @IsDefined()
    housingUnitTypeMedias!: HousingUnitTypeMedia[]

    @IsDefined()
    serviceMedias!: ServiceMedia[]

    @IsDefined()
    bannerMedias!: BannerMedia[]
}
