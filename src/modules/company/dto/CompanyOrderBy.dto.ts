import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { Order } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'

import { CompanyOrderBy } from './CompanyOrderBy.enum'

export class CompanyOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: CompanyOrderBy })
    @IsDefined()
    @IsEnum(CompanyOrderBy)
    orderBy: CompanyOrderBy

    @ApiProperty({ enum: Order })
    @IsDefined()
    @IsEnum(Order)
    order: Order
}
