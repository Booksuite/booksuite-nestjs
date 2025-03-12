import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { BannerOrderBy } from '../enum/BannerOrderBy.enum'

export class BannerOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: BannerOrderBy })
    @IsDefined()
    @IsEnum(BannerOrderBy)
    orderBy: BannerOrderBy

    @ApiProperty({ enum: OrderDirection })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
