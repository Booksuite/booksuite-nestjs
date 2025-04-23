import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsEnum,
    IsOptional,
    IsUUID,
    ValidateNested,
} from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

export class ReservationSearchFilterDTO {
    @ApiProperty({
        enum: ReservationSaleChannel,
        enumName: 'ReservationSaleChannel',
        required: false,
    })
    @IsOptional()
    @IsEnum(ReservationSaleChannel)
    saleChannel?: ReservationSaleChannel

    @ApiProperty({
        required: false,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID()
    sellerUserId?: string

    @ApiProperty({
        required: false,
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID()
    guestUserId?: string

    @ApiProperty({ type: DateRangeDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    dateRange?: DateRangeDTO

    @ApiProperty({ type: DateRangeDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    createdDate?: DateRangeDTO

    @ApiProperty({
        enum: ReservationStatus,
        enumName: 'ReservationStatus',
        isArray: true,
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsEnum(ReservationStatus, { each: true })
    status?: ReservationStatus[]
}
