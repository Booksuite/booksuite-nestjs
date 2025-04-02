import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { ReservationOptionOrderBy } from '../enums/ReservationOptionOrderBy.enum'

export class ReservationOptionOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: ReservationOptionOrderBy,
        enumName: 'ReservationOptionOrderBy',
    })
    @IsDefined()
    @IsEnum(ReservationOptionOrderBy)
    orderBy: ReservationOptionOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
