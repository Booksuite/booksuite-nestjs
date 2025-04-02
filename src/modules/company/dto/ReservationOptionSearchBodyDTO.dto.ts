import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsOptional, ValidateNested } from 'class-validator'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { ReservationOptionOrderByDTO } from './ReservationOptionOrderBy.dto'
import { ReservationOptionSearchFilterDTO } from './ReservationOptionSearchFilter.dto'

export class ReservationOptionSearchBodyDTO {
    @ApiProperty({ type: PaginationQueryDTO })
    @ValidateNested()
    @IsDefined()
    @Type(() => PaginationQueryDTO)
    pagination: PaginationQueryDTO

    @ApiProperty({ type: ReservationOptionSearchFilterDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => ReservationOptionSearchFilterDTO)
    filter?: ReservationOptionSearchFilterDTO

    @ApiProperty({ type: ReservationOptionOrderByDTO, required: false })
    @ValidateNested()
    @IsOptional()
    @Type(() => ReservationOptionOrderByDTO)
    order?: ReservationOptionOrderByDTO
}
