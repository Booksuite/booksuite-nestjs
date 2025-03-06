import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { Order } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { ServiceOrderBy } from '../enum/ServiceOrderBy.enum'

export class ServiceOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: ServiceOrderBy })
    @IsDefined()
    @IsEnum(ServiceOrderBy)
    orderBy: ServiceOrderBy

    @ApiProperty({ enum: Order })
    @IsDefined()
    @IsEnum(Order)
    order: Order
}
