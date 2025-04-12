import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { UNAVAILABLE_REASON_MESSAGE } from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { CalendarAvailability, DayPricingPayload } from '../types'
import { PricingRule } from '../types'

@Injectable()
export class HostingRulesPricing implements PricingRule {
    apply(payload: DayPricingPayload): DayPricingPayload {
        const weekDay = dayjs(payload.pricingPayload.dateRange.start)
            .startOf('day')
            .day()

        const isWeekend =
            payload.pricingPayload.hostingRules.availableWeekend.includes(
                weekDay,
            )

        const basePrice = isWeekend
            ? payload.pricingPayload.housingUnitType.weekendPrice
            : payload.pricingPayload.housingUnitType.weekdaysPrice

        const newPayload: DayPricingPayload = {
            ...payload,
            calendar: {
                ...payload.calendar,
                [payload.currentDate]: {
                    ...payload.calendar[payload.currentDate],
                    basePrice,
                },
            },
        }

        return {
            ...newPayload,
            calendar: {
                ...newPayload.calendar,
                [newPayload.currentDate]: {
                    ...newPayload.calendar[newPayload.currentDate],
                    basePrice,
                    availability: this.checkAvailability(newPayload),
                },
            },
        }
    }

    private checkAvailability(
        payload: DayPricingPayload,
    ): CalendarAvailability {
        const weekDay = dayjs(payload.pricingPayload.dateRange.start)
            .startOf('day')
            .day()

        const isWeekDayAvailable =
            payload.pricingPayload.hostingRules.availableWeekDays.includes(
                weekDay,
            )

        if (!isWeekDayAvailable) {
            return {
                available: false,
                unavailabilitySource: UnavailableSource.HOSTING_RULES,
                unavailableReason: UnavailabilityReason.WEEKDAY_NOT_AVAILABLE,
                unavailableReasonMessage:
                    UNAVAILABLE_REASON_MESSAGE[
                        UnavailabilityReason.WEEKDAY_NOT_AVAILABLE
                    ],
            }
        }

        if (
            payload.pricingPayload.totalDays <
            payload.calendar[payload.currentDate].finalMinDays
        ) {
            return {
                available: false,
                unavailabilitySource: UnavailableSource.HOSTING_RULES,
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
