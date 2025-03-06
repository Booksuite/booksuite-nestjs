import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { ReservationOrderByDTO } from './ReservationOrderBy.dto'
import { ReservationSearchFilterDTO } from './ReservationSearchFilter.dto'

export class ReservationSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @IsDefined()
    @ValidateNested()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: ReservationSearchFilterDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => ReservationSearchFilterDTO)
    filter?: ReservationSearchFilterDTO

    @ApiProperty({ type: ReservationOrderByDTO, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => ReservationOrderByDTO)
    order?: ReservationOrderByDTO
}
