import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { SpecialDateOrderByDTO } from './SpecialDateOrderBy.dto'
import { SpecialDateSearchFilterDTO } from './SpecialDateSearchFilter.dto'

export class SpecialDateSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: SpecialDateSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => SpecialDateSearchFilterDTO)
    filter?: SpecialDateSearchFilterDTO

    @ApiProperty({ type: SpecialDateOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => SpecialDateOrderByDTO)
    order?: SpecialDateOrderByDTO
}
