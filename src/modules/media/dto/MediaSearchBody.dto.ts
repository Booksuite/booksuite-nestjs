import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { MediaFilterDTO } from './MediaFilter.dto'
import { MediaOrderByDTO } from './MediaOrderBy.dto'

export class MediaSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @IsDefined()
    @ValidateNested()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: MediaFilterDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => MediaFilterDTO)
    filter?: MediaFilterDTO

    @ApiProperty({ type: MediaOrderByDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => MediaOrderByDTO)
    order?: MediaOrderByDTO
}
