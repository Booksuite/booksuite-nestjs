import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { Order } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { MediaOrderBy } from '../enum/MediaOrderBy.enum'

export class MediaOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: MediaOrderBy })
    @IsDefined()
    @IsEnum(MediaOrderBy)
    orderBy: MediaOrderBy

    @ApiProperty({ enum: Order })
    @IsDefined()
    @IsEnum(Order)
    order: Order
}
