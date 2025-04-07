import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsUUID } from 'class-validator'

export class SpecialDateHousingUnitTypeDTO {
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
    newWeekPrice: number

    @ApiProperty({ type: Number, example: 200 })
    @IsDefined()
    @IsNumber()
    weekendBasePrice: number

    @ApiProperty({ type: Number, example: 400 })
    @IsDefined()
    @IsNumber()
    weekendNewPrice: number
}
