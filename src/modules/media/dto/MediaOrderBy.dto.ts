import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { MediaOrderBy } from '../enum/MediaOrderBy.enum'

export class MediaOrderByDTO implements OrderByRequest {
    @ApiProperty({ enum: MediaOrderBy, enumName: 'MediaOrderBy' })
    @IsDefined()
    @IsEnum(MediaOrderBy)
    orderBy: MediaOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
