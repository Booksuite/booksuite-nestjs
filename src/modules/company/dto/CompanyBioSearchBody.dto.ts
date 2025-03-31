import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { CompanyBioOrderByDTO } from './CompanyBioOrderBy.dto'
import { CompanyBioSearchFilterDTO } from './CompanyBioSearchFilter.dto'

export class CompanyBioSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: CompanyBioSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => CompanyBioSearchFilterDTO)
    filter?: CompanyBioSearchFilterDTO

    @ApiProperty({ type: CompanyBioOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => CompanyBioOrderByDTO)
    order?: CompanyBioOrderByDTO
}
