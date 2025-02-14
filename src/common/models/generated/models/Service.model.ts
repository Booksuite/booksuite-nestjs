import { Prisma } from '@prisma/client'
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { BookingService, ServiceCategory, ServiceMedia } from './'

export class Service {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    billType!: string

    @IsDefined()
    price!: number

    @IsDefined()
    @IsInt()
    adults!: number

    @IsDefined()
    @IsInt()
    minDaily!: number

    @IsDefined()
    @IsInt()
    minNotice!: number

    @IsDefined()
    @IsBoolean()
    onlineSale!: boolean

    @IsDefined()
    @IsBoolean()
    panelSale!: boolean

    @IsDefined()
    @IsBoolean()
    seasonalSale!: boolean

    @IsDefined()
    @IsDate()
    seasonStart!: Date

    @IsDefined()
    @IsDate()
    seasonEnd!: Date

    @IsOptional()
    hosting?: Prisma.JsonValue

    @IsOptional()
    nights?: Prisma.JsonValue

    @IsDefined()
    @IsString()
    description!: string

    @IsDefined()
    @IsString()
    included!: string

    @IsDefined()
    @IsString()
    notes!: string

    @IsOptional()
    @IsString()
    videoUrl?: string

    @IsDefined()
    medias!: ServiceMedia[]

    @IsDefined()
    bookings!: BookingService[]

    @IsDefined()
    @IsString()
    categoryId!: string

    @IsDefined()
    category!: ServiceCategory

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
