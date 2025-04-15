import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, ValidateNested } from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { AvailAndPricingSearchPayload } from '../types'

export class AvailAndPricingSearchDTO implements AvailAndPricingSearchPayload {
    @ApiProperty({
        type: DateRangeDTO,
        description: 'Date range for the calendar',
    })
    @IsDefined()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    dateRange: DateRangeDTO
}
