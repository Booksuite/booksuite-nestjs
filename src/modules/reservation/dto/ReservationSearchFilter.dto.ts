import { ApiProperty } from '@nestjs/swagger'
import { ReservationSaleChannel, ReservationStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsEnum, IsOptional, IsUUID, ValidateNested } from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

export class ReservationSearchFilterDTO {
    @ApiProperty({
        enum: ReservationSaleChannel,
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
    userId?: string

    @ApiProperty({ type: DateRangeDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    startDate?: DateRangeDTO

    @ApiProperty({ type: DateRangeDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    endDate?: DateRangeDTO

    @ApiProperty({ type: DateRangeDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    createdDate?: DateRangeDTO

    @ApiProperty({ enum: ReservationStatus, required: false })
    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus
}
