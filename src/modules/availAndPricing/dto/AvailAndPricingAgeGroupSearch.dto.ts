import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsUUID } from 'class-validator'
import { IsNumber } from 'class-validator'

export class AvailAndPricingAgeGroupSearchDTO {
    @ApiProperty({
        type: String,
    })
    @IsDefined()
    @IsUUID()
    ageGroupId: string

    @ApiProperty({
        type: Number,
    })
    @IsDefined()
    @IsNumber()
    quantity: number
}
