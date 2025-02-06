import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { BookExperience, BookExtra, Guest, Property } from './'

export class Book {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsString()
    status!: string

    @IsDefined()
    @IsDate()
    startDate!: Date

    @IsDefined()
    @IsDate()
    endDate!: Date

    @IsOptional()
    @IsInt()
    totalDays?: number

    @IsDefined()
    @IsInt()
    adults!: number

    @IsDefined()
    @IsInt()
    children!: number

    @IsDefined()
    @IsString()
    saleChannel!: string

    @IsDefined()
    @IsString()
    notes!: string

    @IsDefined()
    @IsInt()
    propertyId!: number

    @IsDefined()
    property!: Property

    @IsOptional()
    guests?: Guest

    @IsDefined()
    extras!: BookExtra[]

    @IsDefined()
    experiences!: BookExperience[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
