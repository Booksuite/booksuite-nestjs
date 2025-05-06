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
export class SeasonRulesRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload } = payload

        const seasonRules = pricingPayload.seasonRules.find((rule) => {
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

        if (!seasonRules) return payload

        const housingUnitTypePrice = seasonRules.housingUnitTypePrices.find(
            (housingUnitType) =>
                housingUnitType.housingUnitTypeId ===
                payload.pricingPayload.housingUnitType.id,
        )

        if (!housingUnitTypePrice) return payload

        const isWeekend = this.pricingHelpers.isWeekend(
            payload.pricingPayload.hostingRules,
            currentDate,
        )

        const finalPrice = isWeekend
            ? housingUnitTypePrice.finalWeekendPrice
            : housingUnitTypePrice.finalWeekPrice

        payload.calendar[currentDate].seasonRules = seasonRules
        payload.calendar[currentDate].basePrice = finalPrice
        payload.calendar[currentDate].finalPrice = finalPrice
        payload.calendar[currentDate].finalMinStay = seasonRules.minStay

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

        const seasonRules = calendar[currentDate].seasonRules

        if (!seasonRules || !searchPayload)
            return calendar[currentDate].availability

        const weekDay = dayjs(searchPayload.dateRange.start)
            .startOf('day')
            .day()

        const isWeekDayAvailable = seasonRules.validWeekDays.includes(weekDay)

        if (!isWeekDayAvailable) {
            return {
                available: false,
                unavailabilitySource: UnavailableSource.SEASON_RULES,
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
                unavailabilitySource: UnavailableSource.SEASON_RULES,
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
