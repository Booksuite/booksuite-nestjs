import { ApiProperty } from '@nestjs/swagger'
import { PriceVariationType } from '@prisma/client'

export class SeasonRuleResponseDTO {
    @ApiProperty({
        example: 'a7c6b6a9-3a59-4b58-b8a6-3f9c5b0f9c7b',
        required: false,
    })
    id: string

    @ApiProperty({ example: 'Summer Special' })
    name: string

    @ApiProperty({ example: false, type: Boolean })
    published: boolean

    @ApiProperty({ example: '2025-06-01', type: Date })
    startDate: Date

    @ApiProperty({ example: '2025-08-31', type: Date })
    endDate: Date

    @ApiProperty({ example: 3 })
    minDaily: number

    @ApiProperty({ type: Number, isArray: true })
    availableWeekend: PrismaJson.WeekDays

    @ApiProperty({
        enum: PriceVariationType,
        example: PriceVariationType.ABSOLUTE_INCREASE,
        enumName: 'PriceVariationType',
    })
    priceVariationType: PriceVariationType

    @ApiProperty({ example: 20 })
    price: number
}
