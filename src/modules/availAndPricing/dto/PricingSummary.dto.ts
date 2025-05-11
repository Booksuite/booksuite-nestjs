import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { IsDefined } from 'class-validator'

import { PricingSummary } from '../types/payload'

export class PricingSummaryDTO implements PricingSummary {
    @ApiProperty({
        description: 'Base price for the day',
        type: Number,
    })
    @IsDefined()
    @IsNumber()
    basePrice: number

    @ApiProperty({
        description: 'Services price for the day',
        type: Number,
    })
    @IsDefined()
    @IsNumber()
    servicesPrice: number

    @ApiProperty({
        description: 'Children price for the day',
        type: Number,
    })
    @IsDefined()
    @IsNumber()
    childrenPrice: number

    @ApiProperty({
        description: 'Rate option price for the day',
        type: Number,
    })
    @IsDefined()
    @IsNumber()
    rateOptionPrice: number

    @ApiProperty({
        description: 'Final price for the day',
        type: Number,
    })
    @IsDefined()
    @IsNumber()
    finalPrice: number
}
