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
        seasonRule: { priceVariationType: PriceVariationType; price: number },
    ): number {
        switch (seasonRule.priceVariationType) {
            case PriceVariationType.ABSOLUTE_INCREASE:
                return basePrice + seasonRule.price
            case PriceVariationType.ABSOLUTE_REDUCTION:
                return basePrice - seasonRule.price
            case PriceVariationType.PERCENTAGE_INCREASE:
                return basePrice * (1 + seasonRule.price / 100)
            case PriceVariationType.PERCENTAGE_REDUCTION:
                return basePrice * (1 - seasonRule.price / 100)
            case PriceVariationType.CUSTOM:
                return seasonRule.price
            default:
                return basePrice
        }
    }
}
