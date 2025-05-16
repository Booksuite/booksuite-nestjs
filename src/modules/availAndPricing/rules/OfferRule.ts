import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { PricingHelpers } from '../helpers/PricingHelpers'
import { AvailAndPricingOffer } from '../types'
import { AvailAndPricingDayPayload } from '../types/payload'
import { AvailAndPricingRule } from '../types/payload'

@Injectable()
export class OfferRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload, calendar } = payload

        const offer = pricingPayload.housingUnitTypeOffers.find((rule) => {
            return this.checkOfferApplicability(rule, payload)
        })

        if (!offer) return payload

        const basePrice = calendar[currentDate].finalPrice

        const finalPrice = this.pricingHelpers.getPriceVariation(basePrice, {
            priceVariationValue: offer.priceAdjustmentValue,
            priceVariationType: offer.priceAdjustmentType,
        })

        payload.calendar[currentDate].offerAmount = finalPrice - basePrice
        payload.calendar[currentDate].offers = [offer]
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
                (offer.minStay &&
                    pricingPayload.searchPayload.totalStay < offer.minStay) ||
                (offer.maxStay &&
                    pricingPayload.searchPayload.totalStay > offer.maxStay)
            )
                return false
        }

        const isBetween = currentDateDayjs.isBetween(
            dayjs.utc(offer.startDate).startOf('day'),
            dayjs.utc(offer.endDate).endOf('day'),
            'day',
            '[]',
        )

        if (!isBetween) return false

        const weekDay = currentDateDayjs.startOf('day').day()

        const isWeekDayAvailable = offer.validWeekDays.includes(weekDay)

        if (!isWeekDayAvailable) return false

        if (
            calendar[currentDate].specialDates.length > 0 &&
            !offer.validForPackages
        )
            return false

        return true
    }
}
