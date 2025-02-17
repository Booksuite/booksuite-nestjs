import { IsDefined, IsEnum, IsInt, IsString } from 'class-validator'

import { CancellationPolicyPenalty } from '../enums/CancellationPolicyPenalty.enum'

export class PenaltyRangeCreateDTO {
    @IsDefined()
    @IsInt()
    daysBeforeCheckIn!: number

    @IsDefined()
    @IsEnum(CancellationPolicyPenalty)
    penaltyBy!: CancellationPolicyPenalty

    @IsDefined()
    @IsInt()
    value!: number

    @IsDefined()
    @IsString()
    cancellationPolicyId!: string
}
