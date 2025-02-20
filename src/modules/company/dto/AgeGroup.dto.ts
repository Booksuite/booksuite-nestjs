import { ApiProperty } from '@nestjs/swagger'
import {
    IsDefined,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsUUID,
} from 'class-validator'

import { AgeGroupChargeType } from '../enums/AgeGroupChargeType.enum'

export class AgeGroupDTO {
    @ApiProperty({
        example: 'e95517fb-b3bb-492f-b605-d289704cde0e',
        required: false,
    })
    @IsOptional()
    @IsUUID()
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
    @IsEnum(AgeGroupChargeType)
    chargeType!: AgeGroupChargeType

    @ApiProperty({ example: 50, required: false })
    @IsOptional()
    @IsNumber()
    value?: number
}
