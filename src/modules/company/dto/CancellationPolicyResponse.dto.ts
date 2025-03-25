import { ApiProperty } from '@nestjs/swagger'
import { CancellationPolicyPenalty } from '@prisma/client'

export class CancellationPolicyResponseDTO {
    @ApiProperty({
        example: 'bcd82497-2cc3-4998-b3d9-99db2f56b159',
    })
    id!: string

    @ApiProperty({
        enum: CancellationPolicyPenalty,
        enumName: 'CancellationPolicyPenalty',
        example: CancellationPolicyPenalty.FIRST_NIGHT_AMOUNT,
    })
    defaultPenaltyBy!: CancellationPolicyPenalty

    @ApiProperty({
        description: 'Only defined if penalty is not FIRST_NIGHT_AMOUNT',
    })
    defaultValue: number

    @ApiProperty({ type: Boolean, example: true, nullable: true })
    applyCancellationTax: boolean | null

    @ApiProperty({ type: Boolean, example: true, nullable: true })
    extraCancellationTax: boolean | null

    @ApiProperty({ type: Number, example: 48 })
    withdrawalPeriod: number

    @ApiProperty({
        type: String,
        example: 'Descrição dinâmica sobre a política de cancelamento',
        nullable: true,
    })
    dynamicDescription: string | null

    @ApiProperty({
        type: String,
        example: 'Outra descrição adicional',
        nullable: true,
    })
    otherDescription: string | null

    @ApiProperty({
        type: String,
        example: 'Modelo flexível de cancelamento',
        nullable: true,
    })
    flexModel: string | null

    @ApiProperty({
        type: String,
        example: 'Modelo equilibrado de cancelamento',
        nullable: true,
    })
    balancedModel: string | null

    @ApiProperty({
        type: String,
        example: 'Modelo moderado de cancelamento',
        nullable: true,
    })
    moderateModel: string | null

    @ApiProperty({
        type: String,
        example: 'Modelo rigoroso de cancelamento',
        nullable: true,
    })
    hardModel: string | null
}
