import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsNotEmpty, ValidateNested } from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

export class GetCalendarQueryDTO {
    @ApiProperty({
        description: 'Current date in YYYY-MM-DD format',
        example: '2025-01-01',
    })
    @IsDateString()
    @IsNotEmpty()
    currentDate: string

    @ApiProperty({
        type: DateRangeDTO,
        description: 'Date range for the calendar',
    })
    @ValidateNested()
    @Type(() => DateRangeDTO)
    dateRange: DateRangeDTO
}
