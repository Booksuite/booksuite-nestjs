import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { HousingUnitTypeOrderBy } from '../enum/HousingUnitTypeOrderBy.enum'

export class HousingUnitTypeOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: HousingUnitTypeOrderBy })
    @IsDefined()
    @IsEnum(HousingUnitTypeOrderBy)
    orderBy: HousingUnitTypeOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
