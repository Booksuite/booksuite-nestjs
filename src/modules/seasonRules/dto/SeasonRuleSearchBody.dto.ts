import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { SeasonRuleOrderByDTO } from './SeasonRuleOrderBy.dto'
import { SeasonRuleSearchFilterDTO } from './SeasonRuleSearchFilterDTO.dto'

export class SeasonRuleSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: SeasonRuleSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => SeasonRuleSearchFilterDTO)
    filter?: SeasonRuleSearchFilterDTO

    @ApiProperty({ type: SeasonRuleOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => SeasonRuleOrderByDTO)
    order?: SeasonRuleOrderByDTO
}
