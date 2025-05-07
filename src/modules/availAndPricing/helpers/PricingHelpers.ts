import { Injectable } from '@nestjs/common'
import { PriceVariationType } from '@prisma/client'
import dayjs from 'dayjs'

@Injectable()
export class PricingHelpers {
    isWeekend(
        houstingRules: { availableWeekend: number[] },
        date: string,
    ): boolean {
        const dateDayjs = dayjs.utc(date)

        return houstingRules.availableWeekend.includes(dateDayjs.day())
    }

    getPriceVariation(
        basePrice: number,
        seasonRule: {
            priceVariationType: PriceVariationType
            priceVariationValue: number
        },
    ): number {
        switch (seasonRule.priceVariationType) {
            case PriceVariationType.ABSOLUTE_INCREASE:
                return basePrice + seasonRule.priceVariationValue
            case PriceVariationType.ABSOLUTE_REDUCTION:
                return basePrice - seasonRule.priceVariationValue
            case PriceVariationType.PERCENTAGE_INCREASE:
                return basePrice * (1 + seasonRule.priceVariationValue / 100)
            case PriceVariationType.PERCENTAGE_REDUCTION:
                return basePrice * (1 - seasonRule.priceVariationValue / 100)
            case PriceVariationType.CUSTOM:
                return seasonRule.priceVariationValue
            default:
                return basePrice
        }
    }
}
