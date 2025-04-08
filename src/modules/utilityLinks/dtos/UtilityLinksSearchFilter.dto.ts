import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional } from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

export class UtilityLinksSearchFilterDTO {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({
        example: '2025-01-01T00:00:00.000Z',
        required: false,
        type: DateRangeDTO,
    })
    @IsOptional()
    startDate?: DateRangeDTO

    @ApiProperty({
        example: '2025-01-01T00:00:00.000Z',
        required: false,
        type: DateRangeDTO,
    })
    @IsOptional()
    endDate?: DateRangeDTO
}
