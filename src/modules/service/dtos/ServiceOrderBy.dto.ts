import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { ServiceOrderBy } from '../enum/ServiceOrderBy.enum'

export class ServiceOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: ServiceOrderBy,
        enumName: 'ServiceOrderBy',
    })
    @IsDefined()
    @IsEnum(ServiceOrderBy)
    orderBy: ServiceOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
