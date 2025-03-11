import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { FacilityOrderByDTO } from './FacilityOrderBy.dto'
import { FacilitySearchFilterDTO } from './FacilitySearchFilter.dto'

export class FacilitySearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: FacilityOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => FacilityOrderByDTO)
    order?: FacilityOrderByDTO

    @ApiProperty({ type: FacilitySearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => FacilitySearchFilterDTO)
    filter?: FacilitySearchFilterDTO
}
