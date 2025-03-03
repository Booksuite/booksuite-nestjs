import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { Order } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { ReservationOrderBy } from '../enum/ReservationOrderBy.enum'

export class ReservationOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: ReservationOrderBy })
    @IsDefined()
    @IsEnum(ReservationOrderBy)
    orderBy: ReservationOrderBy

    @ApiProperty({ enum: Order })
    @IsDefined()
    @IsEnum(Order)
    order: Order
}
