import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { CompanyOrderBy } from '../enums/CompanyOrderBy.enum'

export class CompanyOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: CompanyOrderBy })
    @IsDefined()
    @IsEnum(CompanyOrderBy)
    orderBy: CompanyOrderBy

    @ApiProperty({ enum: OrderDirection })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
