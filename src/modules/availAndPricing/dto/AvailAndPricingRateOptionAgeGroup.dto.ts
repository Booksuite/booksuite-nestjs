import { ApiProperty, OmitType } from '@nestjs/swagger'

import { RateOptionAgeGroupResponseDTO } from '@/modules/rateOption/dto/RateOptionAgeGroupResponse.dto'

export class AvailAndPricingRateOptionAgeGroupDTO extends OmitType(
    RateOptionAgeGroupResponseDTO,
    ['ageGroup'],
) {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
    })
    ageGroupId: string

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String,
    })
    rateOptionId: string
}
