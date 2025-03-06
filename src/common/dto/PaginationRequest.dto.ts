import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber } from 'class-validator'

import { PaginationQuery } from '../types/pagination'

export class PaginationQueryDTO implements PaginationQuery {
    @ApiProperty({
        description: 'The page number',
        example: 1,
    })
    @IsNumber()
    @IsDefined()
    page: number

    @ApiProperty({
        description: 'The number of items per page',
        example: 10,
    })
    @IsNumber()
    @IsDefined()
    itemsPerPage: number
}
