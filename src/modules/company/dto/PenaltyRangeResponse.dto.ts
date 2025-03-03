import { ApiProperty } from '@nestjs/swagger'
import { CancellationPolicyPenalty } from '@prisma/client'

export class PenaltyRangeResponseDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'Only defined if exists in the DB',
        required: false,
    })
    id: string

    @ApiProperty({ example: 10 })
    daysBeforeCheckIn!: number

    @ApiProperty({
        enum: CancellationPolicyPenalty,
        example: CancellationPolicyPenalty.RESERVATION_PERCENTAGE,
    })
    penaltyBy!: CancellationPolicyPenalty

    @ApiProperty({ example: 20 })
    value!: number
}
