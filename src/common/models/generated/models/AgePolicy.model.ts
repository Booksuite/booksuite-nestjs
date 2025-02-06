import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { Company } from './'

export class AgePolicy {
    @IsDefined()
    @IsInt()
    id!: number

    @IsDefined()
    @IsInt()
    initialAge!: number

    @IsDefined()
    @IsInt()
    finalAge!: number

    @IsDefined()
    @IsString()
    chargeType!: string

    @IsOptional()
    @IsInt()
    value?: number

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
