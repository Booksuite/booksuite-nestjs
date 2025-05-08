import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

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

        payload.calendar[currentDate].specialDates = [specialDates]
        payload.calendar[currentDate].basePrice = finalPrice
        payload.calendar[currentDate].finalPrice = finalPrice
        payload.calendar[currentDate].finalMinStay = specialDates.minStay

        payload.calendar[currentDate].availability =
            this.pricingHelpers.removeUnavailability(
                payload.calendar[currentDate].availability,
                UnavailabilityReason.MIN_DAYS_NOT_REACHED,
            )
        payload.calendar[currentDate].availability.push(
            ...this.checkAvailability(payload),
        )

        return payload
    }

    private checkAvailability({
        calendar,
        currentDate,
        pricingPayload,
    }: AvailAndPricingDayPayload): HousingUnitTypeAvailability[] {
        const { searchPayload } = pricingPayload

        const specialDates = calendar[currentDate].specialDates
        if (!specialDates || !searchPayload) return []

        const newAvailability: HousingUnitTypeAvailability[] = []

        const weekDay = dayjs(searchPayload.dateRange.start)
            .startOf('day')
            .day()

        const isWeekDayAvailable =
            specialDates[0].validWeekDays.includes(weekDay)
        if (!isWeekDayAvailable) {
            newAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.SPECIAL_DATES,
                    UnavailabilityReason.WEEKDAY_NOT_AVAILABLE,
                ),
            )
        }

        if (searchPayload.totalStay < calendar[currentDate].finalMinStay) {
            newAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.SPECIAL_DATES,
                    UnavailabilityReason.MIN_DAYS_NOT_REACHED,
                ),
            )
        }

        return newAvailability
    }
}
