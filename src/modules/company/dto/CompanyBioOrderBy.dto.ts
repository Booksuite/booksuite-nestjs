import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEnum } from 'class-validator'

import { OrderDirection } from '@/common/enum/Order'
import { OrderByRequest } from '@/common/types/orderBy'
import { CompanyBioOrderBy } from '../enums/CompanyBioOrderBy.enum'

export class CompanyBioOrderByDTO implements OrderByRequest {
    @ApiProperty({
        enum: CompanyBioOrderBy,
        enumName: 'CompanyBioOrderBy',
    })
    @IsDefined()
    @IsEnum(CompanyBioOrderBy)
    orderBy: CompanyBioOrderBy

    @ApiProperty({ enum: OrderDirection, enumName: 'OrderDirection' })
    @IsDefined()
    @IsEnum(OrderDirection)
    direction: OrderDirection
}
