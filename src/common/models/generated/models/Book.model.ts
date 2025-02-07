import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

export class Book {
    @IsDefined()
    @IsString()
    status!: string

    @IsDefined()
    @IsString()
    startDate!: Date

    @IsDefined()
    @IsString()
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
}
