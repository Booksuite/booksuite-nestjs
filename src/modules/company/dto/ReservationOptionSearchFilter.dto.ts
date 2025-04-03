import { ApiProperty } from '@nestjs/swagger'
import { BillingType } from '@prisma/client'
import { IsBoolean, IsEnum, IsOptional } from 'class-validator'

export class ReservationOptionSearchFilterDTO {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({
        enum: BillingType,
        enumName: 'BillingType',
        example: BillingType.DAILY,
    })
    @IsOptional()
    @IsEnum(BillingType)
    billingType!: BillingType
}
