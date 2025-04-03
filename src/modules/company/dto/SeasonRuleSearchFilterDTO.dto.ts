import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator'

import { DateRangeDTO } from '@/common/dto/DateRange.dto'

export class SeasonRuleSearchFilterDTO {
    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    published?: boolean

    @ApiProperty({ type: DateRangeDTO, name: 'DateRange', required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    startDate?: DateRangeDTO

    @ApiProperty({ type: DateRangeDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeDTO)
    endDate?: DateRangeDTO
}
