import { Injectable } from '@nestjs/common'

import { PricingHelpers } from '../helpers/PricingHelpers'
import {
    AvailAndPricingDayPayload,
    AvailAndPricingRule,
} from '../types/payload'

@Injectable()
export class RateOptionRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload } = payload

        const rateOptionPrice = this.calculateRateOptionPrice(payload)

        payload.calendar[currentDate].rateOptionPrice = rateOptionPrice
        payload.calendar[currentDate].finalPrice += rateOptionPrice
        payload.calendar[currentDate].rateOption = pricingPayload.rateOption

        return payload
    }

    private calculateRateOptionPrice(
        payload: AvailAndPricingDayPayload,
    ): number {
        const { pricingPayload } = payload

        if (!pricingPayload.rateOption) return 0

        const searchPayload = pricingPayload.searchPayload

        if (!searchPayload) return 0

        const totalAdults = searchPayload.adults

        const totalStay = searchPayload.totalStay

        const adultsPrice = this.pricingHelpers.calculateBillingType(
            pricingPayload.rateOption.additionalAdultPrice,
            pricingPayload.rateOption.billingType,
            1,
            totalAdults,
            totalStay,
        )

        const childrenPrice =
            searchPayload.ageGroups?.reduce((acc, group) => {
                const rateOption = pricingPayload.rateOption
                if (!rateOption) return acc

                const ageGroupPrice = rateOption.ageGroupPrices.find(
                    (price) => price.ageGroupId === group.ageGroupId,
                )

                if (!ageGroupPrice) return acc

                return (
                    acc +
                    this.pricingHelpers.calculateBillingType(
                        ageGroupPrice.price,
                        rateOption.billingType,
                        1,
                        group.quantity,
                        totalStay,
                    )
                )
            }, 0) ?? 0

        const totalPrice = adultsPrice + childrenPrice

        return totalPrice
    }
}
