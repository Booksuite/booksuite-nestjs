import { IsDate, IsDefined, IsIn, IsInt, IsString } from 'class-validator'

import { CancellationPolicyPenalty } from '../enums'
import { getEnumValues } from '../helpers'

import { Company, PenaltyRange } from './'

export class CancellationPolicy {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    text!: string

    @IsDefined()
    @IsIn(getEnumValues(CancellationPolicyPenalty))
    defaultPenaltyBy!: CancellationPolicyPenalty

    @IsDefined()
    @IsInt()
    defaultValue!: number

    @IsDefined()
    @IsString()
    companyId!: string

    @IsDefined()
    company!: Company

    @IsDefined()
    penaltyRanges!: PenaltyRange[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
