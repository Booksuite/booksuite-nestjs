import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { RateOptionOrderByDTO } from './RateOptionOrderBy.dto'
import { RateOptionSearchFilterDTO } from './RateOptionSearchFilter.dto'

export class RateOptionSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: RateOptionSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => RateOptionSearchFilterDTO)
    filter?: RateOptionSearchFilterDTO

    @ApiProperty({ type: RateOptionOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => RateOptionOrderByDTO)
    order?: RateOptionOrderByDTO
}
