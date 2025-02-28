import { ApiProperty } from '@nestjs/swagger'
import { AgeGroupChargeType } from '@prisma/client'
import { IsDefined, IsInt, IsNumber, IsOptional } from 'class-validator'

export class AgeGroupResponseDTO {
    @ApiProperty({
        example: 'e95517fb-b3bb-492f-b605-d289704cde0e',
        required: false,
    })
    id?: string

    @ApiProperty({ example: 0 })
    @IsDefined()
    @IsInt()
    initialAge!: number

    @ApiProperty({ example: 12 })
    @IsDefined()
    @IsInt()
    finalAge!: number

    @ApiProperty({
        enum: AgeGroupChargeType,
        example: AgeGroupChargeType.DAILY_PERCENTAGE_PER_CHILDREN,
    })
    @IsDefined()
    chargeType!: AgeGroupChargeType

    @ApiProperty({ example: 50, required: false })
    @IsOptional()
    @IsNumber()
    value?: number | null
}
