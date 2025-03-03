import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { Order } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { BannerOrderBy } from '@/modules/banner/enum/BannerOrderBy.enum'
import { FacilityOrderBy } from '../enum/FacilityOrderBy.enum'

export class FacilityOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: FacilityOrderBy })
    @IsDefined()
    @IsEnum(FacilityOrderBy)
    orderBy: FacilityOrderBy

    @ApiProperty({ enum: Order })
    @IsDefined()
    @IsEnum(BannerOrderBy)
    order: Order
}
