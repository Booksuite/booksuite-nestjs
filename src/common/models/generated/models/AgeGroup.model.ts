import { IsDate, IsDefined, IsInt, IsOptional, IsString } from 'class-validator'

import { AgePolicy } from './'

export class AgeGroup {
    @IsDefined()
    @IsString()
    id!: string

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

    @IsDefined()
    @IsString()
    agePolicyId!: string

    @IsDefined()
    agePolicies!: AgePolicy

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
