import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { BannerOrderByDTO } from './BannerOrderBy.dto'
import { BannerSearchFilterDTO } from './BannerSearchFilter.dto'

export class BannerSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @IsDefined()
    @ValidateNested()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: BannerOrderByDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => BannerOrderByDTO)
    order?: BannerOrderByDTO

    @ApiProperty({ type: BannerSearchFilterDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => BannerSearchFilterDTO)
    filter?: BannerSearchFilterDTO
}
