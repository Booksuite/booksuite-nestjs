import { IsDate, IsDefined, IsIn, IsInt, IsString } from 'class-validator'

import { CancellationPolicyPenalty } from '../enums'
import { getEnumValues } from '../helpers'

import { CancellationPolicy } from './'

export class PenaltyRange {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsInt()
    daysBeforeCheckIn!: number

    @IsDefined()
    @IsIn(getEnumValues(CancellationPolicyPenalty))
    penaltyBy!: CancellationPolicyPenalty

    @IsDefined()
    @IsInt()
    value!: number

    @IsDefined()
    @IsString()
    cancellationPolicyId!: string

    @IsDefined()
    cancellationPolicy!: CancellationPolicy

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    @IsDate()
    updatedAt!: Date
}
