import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsUUID } from 'class-validator'

export class HousingUnitTypePricingChangeDTO {
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        type: String,
    })
    @IsDefined()
    @IsUUID()
    housingUnitTypeId: string

    @ApiProperty({ type: Number, example: 200 })
    @IsDefined()
    @IsNumber()
    baseWeekPrice: number

    @ApiProperty({ type: Number, example: 400 })
    @IsDefined()
    @IsNumber()
    finalWeekPrice: number

    @ApiProperty({ type: Number, example: 300 })
    @IsDefined()
    @IsNumber()
    baseWeekendPrice: number

    @ApiProperty({ type: Number, example: 600 })
    @IsDefined()
    @IsNumber()
    finalWeekendPrice: number
}
