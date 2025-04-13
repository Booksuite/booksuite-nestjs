import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { PricingHelpers } from '../helpers/PricingHelpers'
import { AvailAndPricingDayPayload } from '../types'
import { AvailAndPricingRule } from '../types'

@Injectable()
export class OfferRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload, calendar } = payload

        const offer = pricingPayload.offers.find((rule) => {
            const isBetween = dayjs
                .utc(currentDate)
                .isBetween(
                    dayjs.utc(rule.validStartDate).startOf('day'),
                    dayjs.utc(rule.validEndDate).endOf('day'),
                    'day',
                    '[]',
                )

            return isBetween
        })

        if (!offer || !this.checkOfferApplicability(payload)) return payload

        const basePrice = calendar[currentDate].basePrice

        const finalPrice = this.pricingHelpers.getPriceVariation(basePrice, {
            price: offer.priceAdjustmentValue,
            priceVariationType: offer.priceAdjustmentType,
        })

        payload.calendar[currentDate].offers = offer
        payload.calendar[currentDate].finalPrice = finalPrice

        return payload
    }

    private checkOfferApplicability({
        calendar,
        currentDate,
    }: AvailAndPricingDayPayload): boolean {
        const offer = calendar[currentDate].offers

        if (!offer) return false

        const weekDay = dayjs.utc(currentDate).startOf('day').day()

        const isWeekDayAvailable = offer.availableWeekDays.includes(weekDay)

        if (!isWeekDayAvailable) return false

        if (!offer.validForPackages && !!calendar[currentDate].specialDates)
            return false

        return true
    }
}
