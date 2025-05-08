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
        const { currentDate } = payload

        const rateOptionPrice = this.calculateRateOptionPrice(payload)

        payload.calendar[currentDate].rateOptionPrice = rateOptionPrice

        payload.calendar[currentDate].finalPrice += rateOptionPrice

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
        const totalChildren =
            searchPayload.ageGroups?.reduce(
                (acc, group) => acc + group.quantity,
                0,
            ) || 0

        const totalStay = searchPayload.totalStay

        const adultsPrice = this.pricingHelpers.calculateBillingType(
            pricingPayload.rateOption.additionalAdultPrice,
            pricingPayload.rateOption.billingType,
            totalAdults,
            totalChildren,
            totalStay,
        )

        const childrenPrice =
            totalChildren > 0
                ? this.pricingHelpers.calculateBillingType(
                      pricingPayload.rateOption.additionalChildrenPrice,
                      pricingPayload.rateOption.billingType,
                      totalChildren,
                      totalAdults,
                      totalStay,
                  )
                : 0

        const totalPrice = adultsPrice + childrenPrice

        return totalPrice
    }
}
