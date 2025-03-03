import { ApiProperty } from '@nestjs/swagger'
import { CancellationPolicyPenalty } from '@prisma/client'

export class CancellationPolicyResponseDTO {
    @ApiProperty({
        example: 'bcd82497-2cc3-4998-b3d9-99db2f56b159',
    })
    id!: string

    @ApiProperty({
        example: 'Check-out min days',
    })
    text!: string

    @ApiProperty({
        enum: CancellationPolicyPenalty,
        example: CancellationPolicyPenalty.FIRST_NIGHT_AMOUNT,
    })
    defaultPenaltyBy!: CancellationPolicyPenalty

    @ApiProperty({
        description: 'Only defined if penalty is not FIRST_NIGHT_AMOUNT',
    })
    defaultValue?: number
}
