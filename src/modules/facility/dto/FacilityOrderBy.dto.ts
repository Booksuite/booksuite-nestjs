import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { FacilityOrderBy } from '../enum/FacilityOrderBy.enum'

export class FacilityOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: FacilityOrderBy,
        enumName: 'FacilityOrderBy',
        example: FacilityOrderBy.NAME,
    })
    @IsDefined()
    @IsEnum(FacilityOrderBy)
    orderBy: FacilityOrderBy

    @ApiProperty({
        enum: OrderDirection,
        enumName: 'OrderDirection',
        example: OrderDirection.ASC,
    })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
