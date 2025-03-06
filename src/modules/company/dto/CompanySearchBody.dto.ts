import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { CompanyOrderByDTO } from './CompanyOrderBy.dto'
import { CompanySearchFilterDTO } from './CompanySearchFilter.dto'

export class CompanySearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: CompanyOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => CompanyOrderByDTO)
    order?: CompanyOrderByDTO

    @ApiProperty({ type: CompanySearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => CompanySearchFilterDTO)
    filter?: CompanySearchFilterDTO
}
