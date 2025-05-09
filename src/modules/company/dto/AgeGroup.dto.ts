import { ApiProperty } from '@nestjs/swagger'
import { AgeGroupChargeType } from '@prisma/client'
import { IsDefined, IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator'

export class AgeGroupDTO {
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
        enumName: 'AgeGroupChargeType',
        example: AgeGroupChargeType.DAILY_PERCENTAGE_PER_CHILDREN,
    })
    @IsDefined()
    @IsEnum(AgeGroupChargeType)
    chargeType!: AgeGroupChargeType

    @ApiProperty({ example: 50, required: false, type: Number })
    @IsOptional()
    @IsNumber()
    value?: number | null
}
