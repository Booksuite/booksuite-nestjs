import { IsDefined, IsNumber } from 'class-validator'

import { PaginationQuery } from '../types/pagination'

export class PaginationQueryDTO implements PaginationQuery {
    @IsNumber()
    @IsDefined()
    page: number

    @IsNumber()
    @IsDefined()
    itemsPerPage: number
}
