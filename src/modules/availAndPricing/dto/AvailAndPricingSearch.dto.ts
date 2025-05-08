import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsArray,
    IsDefined,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'
import { AvailAndPricingSearchPayload } from '../types/payload'

import { AvailAndPricingAgeGroupSearchDTO } from './AvailAndPricingAgeGroupSearch.dto'
import { AvailAndPricingSearchServiceDTO } from './AvailAndPricingSearchService.dto'

export class AvailAndPricingSearchDTO implements AvailAndPricingSearchPayload {
    @ApiProperty({
        type: DateRangeDTO,
        description: 'Date range for the calendar',
    })
    @IsDefined()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    dateRange: DateRangeDTO

    @ApiProperty({
        type: Number,
        description: 'Number of adults',
    })
    @IsNumber()
    @IsDefined()
    adults: number

    @ApiProperty({
        type: [AvailAndPricingAgeGroupSearchDTO],
        description: 'Age groups and quantity',
        required: false,
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AvailAndPricingAgeGroupSearchDTO)
    ageGroups?: AvailAndPricingAgeGroupSearchDTO[]

    @ApiProperty({
        type: [AvailAndPricingSearchServiceDTO],
        description: 'Services',
        required: false,
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AvailAndPricingSearchServiceDTO)
    services?: AvailAndPricingSearchServiceDTO[]
}
