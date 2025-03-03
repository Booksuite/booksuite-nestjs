import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { Order } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { BannerOrderBy } from '../enum/BannerOrderBy.enum'

export class BannerOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: BannerOrderBy })
    @IsDefined()
    @IsEnum(BannerOrderBy)
    orderBy: BannerOrderBy

    @ApiProperty({ enum: Order })
    @IsDefined()
    @IsEnum(BannerOrderBy)
    order: Order
}
