import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { ReservationOrderBy } from '../enum/ReservationOrderBy.enum'

export class ReservationOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: ReservationOrderBy,
        enumName: 'ReservationOrderBy',
    })
    @IsDefined()
    @IsEnum(ReservationOrderBy)
    orderBy: ReservationOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
