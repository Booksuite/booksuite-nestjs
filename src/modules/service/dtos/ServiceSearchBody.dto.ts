import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { ServiceOrderByDTO } from './ServiceOrderBy.dto'
import { ServiceSearchFilterDTO } from './ServiceSearchFilter.dto'

export class ServiceSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: ServiceSearchFilterDTO, required: false })
    @ValidateNested()
    @IsDefined()
    @IsOptional()
    @Type(() => ServiceSearchFilterDTO)
    filter?: ServiceSearchFilterDTO

    @ApiProperty({ type: ServiceOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => ServiceOrderByDTO)
    order?: ServiceOrderByDTO
}
