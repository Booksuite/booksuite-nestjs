import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { UtilityLinksOrderBy } from '../enum/UtilityLinksOrderBy.enum'

export class UtilityLinksOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: UtilityLinksOrderBy,
        enumName: 'CompanyBioOrderBy',
    })
    @IsDefined()
    @IsEnum(UtilityLinksOrderBy)
    orderBy: UtilityLinksOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
