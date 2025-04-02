import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsUUID } from 'class-validator'

export class SeasonRuleHousingUnitTypeCreateDTO {
    @ApiProperty({
        example: 'f37b28c1-a26b-4f92-8b4e-5a3b6b8d4a77',
        type: String,
    })
    @IsDefined()
    @IsUUID()
    housingUnitTypeId: string

    @ApiProperty({ example: 1000, type: Number })
    @IsDefined()
    @IsNumber()
    baseWeekPrice: number

    @ApiProperty({ example: 1200, type: Number })
    @IsDefined()
    @IsNumber()
    newWeekPrice: number

    @ApiProperty({ example: 1500, type: Number })
    @IsDefined()
    @IsNumber()
    weekendBasePrice: number

    @ApiProperty({ example: 1800, type: Number })
    @IsDefined()
    @IsNumber()
    weekendNewPrice: number
}
