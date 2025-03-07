import { ApiProperty } from '@nestjs/swagger'
import { CancellationPolicyPenalty } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDefined,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { PenaltyRangeDTO } from './PenaltyRange.dto'

export class CancellationPolicyDTO {
    @IsDefined()
    @IsString()
    text!: string

    @ApiProperty({
        enum: CancellationPolicyPenalty,
        example: CancellationPolicyPenalty.FIRST_NIGHT_AMOUNT,
    })
    @IsEnum(CancellationPolicyPenalty)
    defaultPenaltyBy!: CancellationPolicyPenalty

    @ApiProperty({
        description: 'Only defined if penalty is not FIRST_NIGHT_AMOUNT',
    })
    @IsOptional()
    @IsInt()
    defaultValue?: number

    @ApiProperty({
        type: [PenaltyRangeDTO],
    })
    @IsArray()
    @Type(() => PenaltyRangeDTO)
    @ValidateNested({ each: true })
    @IsDefined()
    penaltyRanges!: PenaltyRangeDTO[]
}
