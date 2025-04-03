import { ApiProperty } from '@nestjs/swagger'

import { HousingUnitTypeResponseDTO } from '@/modules/housingUnitType/dto/HousingUnitTypeResponse.dto'

export class SeasonRuleHousingUnitTypeResponseDTO {
    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    id: string

    @ApiProperty({ example: 'e95517fb-b3bb-492f-b605-d289704cde0e' })
    seasonRuleId: string

    @ApiProperty({ example: 'f37b28c1-a26b-4f92-8b4e-5a3b6b8d4a77' })
    housingUnitType: HousingUnitTypeResponseDTO

    @ApiProperty({ example: 1000 })
    baseWeekPrice: number

    @ApiProperty({ example: 1200 })
    newWeekPrice: number

    @ApiProperty({ example: 1500 })
    weekendBasePrice: number

    @ApiProperty({ example: 1800 })
    weekendNewPrice: number
}
