import { ApiProperty } from '@nestjs/swagger'
import { CancellationPolicyPenalty } from '@prisma/client'

export class CancellationPolicyResponseDTO {
    @ApiProperty({
        example: 'bcd82497-2cc3-4998-b3d9-99db2f56b159',
    })
    id!: string

    @ApiProperty({
        enum: CancellationPolicyPenalty,
        example: CancellationPolicyPenalty.FIRST_NIGHT_AMOUNT,
    })
    defaultPenaltyBy!: CancellationPolicyPenalty

    @ApiProperty({
        description: 'Only defined if penalty is not FIRST_NIGHT_AMOUNT',
    })
    defaultValue?: number

    @ApiProperty({ example: true })
    applyCancellationTax?: boolean | null

    @ApiProperty({ example: true })
    extraCancellationTax: boolean | null

    @ApiProperty({ example: 48 })
    withDrawalPeriod: number

    @ApiProperty({
        example: 'Descrição dinâmica sobre a política de cancelamento',
        required: false,
    })
    dynamicDescription: string | null

    @ApiProperty({ example: 'Outra descrição adicional', required: false })
    otherDescription: string | null

    @ApiProperty({
        example: 'Modelo flexível de cancelamento',
        required: false,
    })
    flexModel: string | null

    @ApiProperty({
        example: 'Modelo equilibrado de cancelamento',
        required: false,
    })
    balancedModel: string | null

    @ApiProperty({
        example: 'Modelo moderado de cancelamento',
        required: false,
    })
    moderateModel: string | null

    @ApiProperty({
        example: 'Modelo rigoroso de cancelamento',
        required: false,
    })
    hardModel: string | null
}
