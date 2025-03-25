import { ApiProperty } from '@nestjs/swagger'
import { CancellationPolicyPenalty } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator'

import { PenaltyRangeDTO } from './PenaltyRange.dto'

export class CancellationPolicyDTO {
    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    applyCancellationTax?: boolean

    @ApiProperty({
        enum: CancellationPolicyPenalty,
        example: CancellationPolicyPenalty.FIRST_NIGHT_AMOUNT,
    })
    @IsEnum(CancellationPolicyPenalty)
    defaultPenaltyBy!: CancellationPolicyPenalty

    @ApiProperty({
        description: 'Only defined if penalty is not FIRST_NIGHT_AMOUNT',
    })
    @IsOptional()
    @IsInt()
    defaultValue?: number

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    extraCancellationTax?: boolean

    @ApiProperty({ example: 48 })
    @IsDefined()
    @IsInt()
    withDrawalPeriod!: number

    @ApiProperty({
        example: 'Descrição dinâmica sobre a política de cancelamento',
        required: false,
    })
    @IsOptional()
    @IsString()
    dynamicDescription?: string

    @ApiProperty({ example: 'Outra descrição adicional', required: false })
    @IsOptional()
    @IsString()
    otherDescription?: string

    @ApiProperty({
        example: 'Modelo flexível de cancelamento',
        required: false,
    })
    @IsOptional()
    @IsString()
    flexModel?: string

    @ApiProperty({
        example: 'Modelo equilibrado de cancelamento',
        required: false,
    })
    @IsOptional()
    @IsString()
    balancedModel?: string

    @ApiProperty({
        example: 'Modelo moderado de cancelamento',
        required: false,
    })
    @IsOptional()
    @IsString()
    moderateModel?: string

    @ApiProperty({
        example: 'Modelo rigoroso de cancelamento',
        required: false,
    })
    @IsOptional()
    @IsString()
    hardModel?: string

    @ApiProperty({
        type: [PenaltyRangeDTO],
    })
    @IsArray()
    @Type(() => PenaltyRangeDTO)
    @ValidateNested({ each: true })
    @IsDefined()
    penaltyRanges!: PenaltyRangeDTO[]
}
