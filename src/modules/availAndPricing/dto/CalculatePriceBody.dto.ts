import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsDefined, ValidateNested } from 'class-validator'
import { IsNotEmpty } from 'class-validator'

import { AvailAndPricingSearchDTO } from './AvailAndPricingSearch.dto'

export class CalculatePriceBody {
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
    @IsDefined()
    @ValidateNested()
    @Type(() => AvailAndPricingSearchDTO)
    search: AvailAndPricingSearchDTO
}
