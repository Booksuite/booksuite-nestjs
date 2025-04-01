import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationTypes } from '@prisma/client'

export class SeasonRulesResponseDTO {
    @ApiProperty({
        example: 'a7c6b6a9-3a59-4b58-b8a6-3f9c5b0f9c7b',
        required: false,
    })
    id: string

    @ApiProperty({ example: 'Summer Special' })
    name: string

    @ApiProperty({ example: '2025-06-01' })
    startDate: Date

    @ApiProperty({ example: '2025-08-31' })
    endDate: Date

    @ApiProperty({ example: 3 })
    minDaily: number

    @ApiProperty({ example: '[0,1,2]' })
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({ enum: PriceVariationTypes })
    priceVariationType: PriceVariationTypes

    @ApiProperty({ example: 20 })
    price: number
}
