import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { OfferOrderByDTO } from './OfferOrderBy.dto'
import { OfferSearchFilterDTO } from './OfferSearchFilter.dto'

export class OfferSearchBodyDTO {
    @ApiProperty()
    @ValidateNested()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => OfferOrderByDTO)
    order?: OfferOrderByDTO

    @ApiProperty({ required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => OfferSearchFilterDTO)
    filter?: OfferSearchFilterDTO
}
