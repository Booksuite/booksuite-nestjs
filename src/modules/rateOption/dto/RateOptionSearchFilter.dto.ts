import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator'

export class RateOptionSearchFilterDTO {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({
        enum: BillingType,
        isArray: true,
        enumName: 'BillingType',
        example: [BillingType.DAILY],
        required: false,
    })
    @IsOptional()
    @IsEnum(BillingType, { each: true })
    billingType?: BillingType[]

    @ApiProperty({
        type: String,
        isArray: true,
        example: ['123e4567-e89b-12d3-a456-426614174000'],
        required: false,
    })
    @IsOptional()
    @IsUUID('4', { each: true })
    housingUnitTypeIds?: string[]
}
