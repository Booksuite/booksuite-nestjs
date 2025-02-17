import { IsDefined, IsEnum, IsInt, IsString } from 'class-validator'

import { CancellationPolicyPenalty } from '../enums/CancellationPolicyPenalty.enum'

import { PenaltyRangeCreateDTO } from './PenaltyRangeCreate.dto'

export class CancellationPolicyCreateDTO {
    @IsDefined()
    @IsString()
    text!: string

    @IsEnum(CancellationPolicyPenalty)
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
