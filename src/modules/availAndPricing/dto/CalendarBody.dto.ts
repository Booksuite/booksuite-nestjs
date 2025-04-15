import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsDateString,
    IsDefined,
    IsNotEmpty,
    IsOptional,
    ValidateNested,
} from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

import { AvailAndPricingSearchDTO } from './AvailAndPricingSearch.dto'

export class CalendarBodyDTO {
    @ApiProperty({
        description: 'Current date in YYYY-MM-DD format',
        example: '2025-01-01',
    })
    @IsDateString()
    @IsNotEmpty()
    currentDate: string

    @ApiProperty({
        type: AvailAndPricingSearchDTO,
        description: 'Search payload for the calendar',
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => AvailAndPricingSearchDTO)
    search?: AvailAndPricingSearchDTO

    @ApiProperty({
        type: DateRangeDTO,
        description: 'Date range for the calendar',
    })
    @IsDefined()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    viewWindow: DateRangeDTO
}
