import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { TariffOptionOrderBy } from '../enum/TariffOptionOrderBy.enum'

export class TariffOptionOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: TariffOptionOrderBy,
        enumName: 'ReservationOptionOrderBy',
    })
    @IsDefined()
    @IsEnum(TariffOptionOrderBy)
    orderBy: TariffOptionOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
