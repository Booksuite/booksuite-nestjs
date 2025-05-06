import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { UNAVAILABLE_REASON_MESSAGE } from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { PricingHelpers } from '../helpers/PricingHelpers'
import {
    AvailAndPricingDayPayload,
    HousingUnitTypeAvailability,
} from '../types/payload'
import { AvailAndPricingRule } from '../types/payload'

@Injectable()
export class SpecialDatesRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload, calendar } = payload

        const specialDates = pricingPayload.specialDates.find((rule) => {
            const isBetween = dayjs
                .utc(currentDate)
                .isBetween(
                    dayjs.utc(rule.startDate).startOf('day'),
                    dayjs.utc(rule.endDate).endOf('day'),
                    'day',
                    '[)',
                )

            return isBetween
        })

        if (!specialDates) return payload

        const basePrice = calendar[currentDate].basePrice

        const finalPrice = this.pricingHelpers.getPriceVariation(
            basePrice,
            specialDates,
        )

        payload.calendar[currentDate].specialDates = specialDates
        payload.calendar[currentDate].basePrice = finalPrice
        payload.calendar[currentDate].finalPrice = finalPrice
        payload.calendar[currentDate].finalMinStay = specialDates.minStay
        payload.calendar[currentDate].availability =
            this.checkAvailability(payload)

        return payload
    }

    private checkAvailability({
        calendar,
        currentDate,
        pricingPayload,
    }: AvailAndPricingDayPayload): HousingUnitTypeAvailability {
        const { searchPayload } = pricingPayload

        const specialDates = calendar[currentDate].specialDates

        if (!specialDates || !searchPayload)
            return calendar[currentDate].availability

        const weekDay = dayjs(searchPayload.dateRange.start)
            .startOf('day')
            .day()

        const isWeekDayAvailable = specialDates.validWeekDays.includes(weekDay)
        if (!isWeekDayAvailable) {
            return {
                available: false,
                unavailabilitySource: UnavailableSource.SPECIAL_DATES,
                unavailableReason: UnavailabilityReason.WEEKDAY_NOT_AVAILABLE,
                unavailableReasonMessage:
                    UNAVAILABLE_REASON_MESSAGE[
                        UnavailabilityReason.WEEKDAY_NOT_AVAILABLE
                    ],
            }
        }

        if (searchPayload.totalStay < calendar[currentDate].finalMinStay) {
            return {
                available: false,
                unavailabilitySource: UnavailableSource.SPECIAL_DATES,
                unavailableReason: UnavailabilityReason.MIN_DAYS_NOT_REACHED,
                unavailableReasonMessage:
                    UNAVAILABLE_REASON_MESSAGE[
                        UnavailabilityReason.MIN_DAYS_NOT_REACHED
                    ],
            }
        }

        return {
            available: true,
            unavailabilitySource: null,
            unavailableReason: null,
            unavailableReasonMessage: null,
        }
    }
}
