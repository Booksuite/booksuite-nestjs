import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsEnum, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'
import { Order } from '@/common/enum/Order'

import { ServiceOrderByDTO } from './ServiceOrderBy.dto'
import { ServiceSearchQueryDTO } from './ServiceSearchQuery.dto'

export class ServiceSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: ServiceSearchQueryDTO })
    @ValidateNested()
    @IsDefined()
    @IsEnum(Order)
    @IsOptional()
    @Type(() => ServiceSearchQueryDTO)
    filter: ServiceSearchQueryDTO

    @ApiProperty({ type: ServiceOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => ServiceOrderByDTO)
    order: ServiceOrderByDTO
}
