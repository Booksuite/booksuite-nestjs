import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { UNAVAILABLE_REASON_MESSAGE } from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { AvailAndPricingDayPayload, CalendarAvailability } from '../types'
import { AvailAndPricingRule } from '../types'

@Injectable()
export class HostingRulesRule implements AvailAndPricingRule {
    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const {
            pricingPayload: { searchPayload, housingUnitType },
        } = payload

        if (!searchPayload) return payload

        const weekDay = dayjs(searchPayload.dateRange.start)
            .startOf('day')
            .day()

        const isWeekend =
            payload.pricingPayload.hostingRules.availableWeekend.includes(
                weekDay,
            )

        const basePrice = isWeekend
            ? housingUnitType.weekendPrice
            : housingUnitType.weekdaysPrice

        const newPayload: AvailAndPricingDayPayload = {
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
        payload: AvailAndPricingDayPayload,
    ): CalendarAvailability {
        const {
            pricingPayload: { searchPayload },
        } = payload

        if (!searchPayload)
            return payload.calendar[payload.currentDate].availability

        const weekDay = dayjs(searchPayload.dateRange.start)
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
            searchPayload.totalDays <
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
