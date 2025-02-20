import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator'

import { CancellationPolicyPenalty } from '../enums/CancellationPolicyPenalty.enum'

export class PenaltyRangeDTO {
    @ApiProperty({
        example: 10,
        description: 'Only defined if exists in the DB',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    id?: string

    @ApiProperty({ example: 10 })
    @IsDefined()
    @IsInt()
    daysBeforeCheckIn!: number

    @ApiProperty({
        enum: CancellationPolicyPenalty,
        example: CancellationPolicyPenalty.BOOKING_PERCENTAGE,
    })
    @IsDefined()
    @IsEnum(CancellationPolicyPenalty)
    penaltyBy!: CancellationPolicyPenalty

    @ApiProperty({ example: 20 })
    @IsDefined()
    @IsInt()
    value!: number
}
