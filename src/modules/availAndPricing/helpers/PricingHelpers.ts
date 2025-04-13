import { Injectable } from '@nestjs/common'
import { PriceVariationType } from '@prisma/client'

@Injectable()
export class PricingHelpers {
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
