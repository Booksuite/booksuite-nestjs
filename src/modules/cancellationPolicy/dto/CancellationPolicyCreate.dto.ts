import { IsDefined, IsIn, IsInt, IsString } from 'class-validator'
import { getEnumValues } from 'src/common/models/generated/helpers/index'

import { CancellationPolicyPenalty } from '../enums/CancellationPolicyPenalty.enum'

import { PenaltyRangeCreateDTO } from './PenaltyRangeCreate.dto'

export class CancellationPolicyCreateDTO {
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
    penaltyRanges!: PenaltyRangeCreateDTO[]
}
