import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypeResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponse.dto'

export class SpecialDateHousingUnitTypeResponseDTO {
    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        type: String,
    })
    specialDateId: string

    @ApiProperty({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        type: HousingUnitTypeResponseDTO,
    })
    housingUnitType: HousingUnitTypeResponseDTO

    @ApiProperty({ type: Number, example: 200 })
    baseWeekPrice: number

    @ApiProperty({ type: Number, example: 400 })
    newWeekPrice: number

    @ApiProperty({ type: Number, example: 200 })
    weekendBasePrice: number

    @ApiProperty({ type: Number, example: 400 })
    weekendNewPrice: number
}
