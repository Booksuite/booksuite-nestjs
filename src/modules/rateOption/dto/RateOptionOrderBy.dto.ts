import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { RateOptionOrderBy } from '../enum/RateOptionOrderBy.enum'

export class RateOptionOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: RateOptionOrderBy,
        enumName: 'RateOptionOrderBy',
    })
    @IsDefined()
    @IsEnum(RateOptionOrderBy)
    orderBy: RateOptionOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
