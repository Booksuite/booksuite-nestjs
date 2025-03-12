import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { HousingUnitTypeOrderByDTO } from './HousingUnitTypeOrderBy.dto'
import { HousingUnitTypeSearchFilterDTO } from './HousingUnitTypeSearchFilter.dto'

export class HousingUnitTypeSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: HousingUnitTypeSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => HousingUnitTypeSearchFilterDTO)
    filter?: HousingUnitTypeSearchFilterDTO

    @ApiProperty({ type: HousingUnitTypeOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => HousingUnitTypeOrderByDTO)
    order?: HousingUnitTypeOrderByDTO
}
