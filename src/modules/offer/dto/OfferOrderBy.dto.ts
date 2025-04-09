import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsIn } from 'class-validator'

enum OfferOrderByField {
    name = 'name',
    createdAt = 'createdAt',
    purchaseStartDate = 'purchaseStartDate',
    purchaseEndDate = 'purchaseEndDate',
}

enum OrderDirection {
    asc = 'asc',
    desc = 'desc',
}

export class OfferOrderByDTO {
    @ApiProperty({
        enum: OfferOrderByField,
        default: OfferOrderByField.createdAt,
    })
    @IsEnum(OfferOrderByField)
    orderBy: OfferOrderByField = OfferOrderByField.createdAt

    @ApiProperty({
        enum: OrderDirection,
        default: OrderDirection.desc,
    })
    @IsIn(['asc', 'desc'])
    direction: OrderDirection = OrderDirection.desc
}
