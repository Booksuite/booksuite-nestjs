import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, ValidateNested } from 'class-validator'

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
    @IsDefined()
    @Type(() => HousingUnitTypeSearchFilterDTO)
    filter?: HousingUnitTypeSearchFilterDTO

    @ApiProperty({ type: HousingUnitTypeOrderByDTO, required: false })
    @ValidateNested()
    @IsDefined()
    @Type(() => HousingUnitTypeOrderByDTO)
    order?: HousingUnitTypeOrderByDTO
}
