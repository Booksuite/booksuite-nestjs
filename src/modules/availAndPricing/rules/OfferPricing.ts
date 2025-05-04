import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { PricingHelpers } from '../helpers/PricingHelpers'
import { AvailAndPricingDayPayload, AvailAndPricingOffer } from '../types'
import { AvailAndPricingRule } from '../types'

@Injectable()
export class OfferRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload, calendar } = payload

        const offer = pricingPayload.offers.find((rule) => {
            return this.checkOfferApplicability(rule, payload)
        })

        if (!offer) return payload

        const basePrice = calendar[currentDate].finalPrice

        const finalPrice = this.pricingHelpers.getPriceVariation(basePrice, {
            price: offer.priceAdjustmentValue,
            priceVariationType: offer.priceAdjustmentType,
        })

        payload.calendar[currentDate].offers = offer
        payload.calendar[currentDate].finalPrice = finalPrice

        return payload
    }

    private checkOfferApplicability(
        offer: AvailAndPricingOffer,
        { calendar, currentDate, pricingPayload }: AvailAndPricingDayPayload,
    ): boolean {
        if (!offer) return false

        const currentDateDayjs = dayjs.utc(currentDate)

        if (pricingPayload.searchPayload) {
            if (
                (offer.minDays &&
                    pricingPayload.searchPayload.totalDays < offer.minDays) ||
                (offer.maxDays &&
                    pricingPayload.searchPayload.totalDays > offer.maxDays)
            )
                return false
        }

        const isBetween = currentDateDayjs.isBetween(
            dayjs.utc(offer.validStartDate).startOf('day'),
            dayjs.utc(offer.validEndDate).endOf('day'),
            'day',
            '[]',
        )

        if (!isBetween) return false

        const weekDay = currentDateDayjs.startOf('day').day()

        const isWeekDayAvailable = offer.availableWeekDays.includes(weekDay)

        if (!isWeekDayAvailable) return false

        if (!offer.validForPackages && !!calendar[currentDate].specialDates)
            return false

        return true
    }
}
