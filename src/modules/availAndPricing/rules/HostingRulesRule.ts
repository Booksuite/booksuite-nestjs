import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { UNAVAILABLE_REASON_MESSAGE } from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import {
    AvailAndPricingDayPayload,
    HousingUnitTypeAvailability,
} from '../types/payload'
import { AvailAndPricingRule } from '../types/payload'

@Injectable()
export class HostingRulesRule implements AvailAndPricingRule {
    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const {
            pricingPayload: { housingUnitType, viewWindow },
        } = payload

        const weekDay = dayjs(viewWindow.start).startOf('day').day()

        const isWeekend =
            payload.pricingPayload.hostingRules.availableWeekend.includes(
                weekDay,
            )

        const basePrice = isWeekend
            ? housingUnitType.weekendPrice
            : housingUnitType.weekdaysPrice

        const adults = payload.pricingPayload.searchPayload?.adults ?? 1
        const maxAdults = housingUnitType.maxAdults

        let finalPrice = basePrice

        if (maxAdults && adults > maxAdults)
            finalPrice += housingUnitType.extraAdultPrice * (adults - maxAdults)

        const newPayload: AvailAndPricingDayPayload = {
            ...payload,
            calendar: {
                ...payload.calendar,
                [payload.currentDate]: {
                    ...payload.calendar[payload.currentDate],
                    basePrice,
                    finalPrice,
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
    ): HousingUnitTypeAvailability {
        const {
            pricingPayload: { searchPayload, housingUnitType },
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
            searchPayload.totalStay <
            payload.calendar[payload.currentDate].finalMinStay
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

        const totalAdults = searchPayload?.adults ?? 1
        const totalChildren =
            searchPayload?.ageGroups?.reduce(
                (acc, curr) => acc + curr.quantity,
                0,
            ) ?? 0

        const totalGuests = totalAdults + totalChildren

        if (
            housingUnitType.maxGuests !== null &&
            totalGuests > housingUnitType.maxGuests
        ) {
            return {
                available: false,
                unavailabilitySource: UnavailableSource.HOSTING_RULES,
                unavailableReason: UnavailabilityReason.MAX_GUESTS_EXCEEDED,
                unavailableReasonMessage:
                    UNAVAILABLE_REASON_MESSAGE[
                        UnavailabilityReason.MAX_GUESTS_EXCEEDED
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
