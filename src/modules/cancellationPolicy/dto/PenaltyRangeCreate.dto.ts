import { IsDefined, IsIn, IsInt, IsString } from 'class-validator'
import { getEnumValues } from 'src/common/models/generated/helpers/index'

import { CancellationPolicyPenalty } from '../enums/CancellationPolicyPenalty.enum'

export class PenaltyRangeCreateDTO {
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
}
