import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { SeasonRuleOrderBy } from '../enums/SeasonRuleOrderBy.enum'

export class SeasonRuleOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: SeasonRuleOrderBy,
        enumName: 'SeasonRuleOrderBy',
    })
    @IsDefined()
    @IsEnum(SeasonRuleOrderBy)
    orderBy: SeasonRuleOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
