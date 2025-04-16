import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { TariffOptionOrderByDTO } from './TariffOptionOrderBy.dto'
import { TariffOptionSearchFilterDTO } from './TariffOptionSearchFilter.dto'

export class TariffOptionSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: TariffOptionSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => TariffOptionSearchFilterDTO)
    filter?: TariffOptionSearchFilterDTO

    @ApiProperty({ type: TariffOptionOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => TariffOptionOrderByDTO)
    order?: TariffOptionOrderByDTO
}
