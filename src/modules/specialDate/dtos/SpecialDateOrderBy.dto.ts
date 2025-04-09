import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { SpecialDateOrderBy } from '../enum/SpecialDateOrderBy.enum'

export class SpecialDateOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: SpecialDateOrderBy,
        enumName: 'SpecialDateOrderBy',
    })
    @IsDefined()
    @IsEnum(SpecialDateOrderBy)
    orderBy: SpecialDateOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
