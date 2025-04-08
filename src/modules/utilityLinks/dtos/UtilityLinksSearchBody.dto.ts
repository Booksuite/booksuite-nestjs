import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { UtilityLinksOrderByDTO } from './UtilityLinksOrderBy.dto'
import { UtilityLinksSearchFilterDTO } from './UtilityLinksSearchFilter.dto'

export class UtilityLinksSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: UtilityLinksSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => UtilityLinksSearchFilterDTO)
    filter?: UtilityLinksSearchFilterDTO

    @ApiProperty({ type: UtilityLinksOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => UtilityLinksOrderByDTO)
    order?: UtilityLinksOrderByDTO
}
