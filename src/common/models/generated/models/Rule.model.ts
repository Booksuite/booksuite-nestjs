import { Prisma } from '@prisma/client'
import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator'

import { Property } from './'

export class Rule {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    checkIn!: string

    @IsDefined()
    @IsString()
    checkOut!: string

    @IsDefined()
    @IsInt()
    minDaily!: number

    @IsOptional()
    weekendNights?: Prisma.JsonValue

    @IsDefined()
    @IsString()
    hostingSeason!: string

    @IsOptional()
    hosting?: Prisma.JsonValue

    @IsOptional()
    @IsDate()
    hostingStartAt?: Date

    @IsOptional()
    @IsDate()
    hostingEndAt?: Date

    @IsOptional()
    @IsBoolean()
    specificDays?: boolean

    @IsOptional()
    days?: Prisma.JsonValue

    @IsDefined()
    @IsInt()
    propertyId!: number

    @IsDefined()
    property!: Property

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
