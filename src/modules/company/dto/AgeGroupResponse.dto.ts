import { ApiProperty } from '@nestjs/swagger'
import { AgeGroupChargeType } from '@prisma/client'

export class AgeGroupResponseDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    id: string

    @ApiProperty({ example: 0 })
    initialAge!: number

    @ApiProperty({ example: 12 })
    finalAge!: number

    @ApiProperty({
        enum: AgeGroupChargeType,
        example: AgeGroupChargeType.DAILY_PERCENTAGE_PER_CHILDREN,
    })
    chargeType!: AgeGroupChargeType

    @ApiProperty({ example: 50, nullable: true, type: Number })
    value: number | null
}
