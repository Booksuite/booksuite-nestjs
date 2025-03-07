import { ApiProperty } from '@nestjs/swagger'
import { CancellationPolicyPenalty } from '@prisma/client'
import { IsDefined, IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator'

export class PenaltyRangeDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
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
        example: CancellationPolicyPenalty.RESERVATION_PERCENTAGE,
    })
    @IsDefined()
    @IsEnum(CancellationPolicyPenalty)
    penaltyBy!: CancellationPolicyPenalty

    @ApiProperty({ example: 20 })
    @IsDefined()
    @IsInt()
    value!: number
}
