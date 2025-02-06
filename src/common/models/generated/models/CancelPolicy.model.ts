import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { Company } from './'

export class CancelPolicy {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    daysBeforeCheckIn!: number

    @IsDefined()
    @IsString()
    penaltyBy!: string

    @IsDefined()
    @IsInt()
    value!: number

    @IsOptional()
    @IsInt()
    companyId?: number

    @IsOptional()
    company?: Company

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
