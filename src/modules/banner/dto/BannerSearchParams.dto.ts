import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsEnum, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { BannerOrderByDTO } from './BannerOrderBy.dto'

export class BannerSearchParamsDTO {
    @ApiProperty({ type: BannerOrderByDTO, required: false })
    @IsOptional()
    @IsEnum(BannerOrderByDTO)
    order: BannerOrderByDTO

    @ApiProperty({ type: PaginationQueryDTO })
    @IsDefined()
    @ValidateNested()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO
}
