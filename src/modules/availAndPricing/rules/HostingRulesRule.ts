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
export class HostingRulesRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

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
    ): HousingUnitTypeAvailability[] {
        const {
            pricingPayload: { searchPayload, housingUnitType },
        } = payload

        const currentAvailability =
            payload.calendar[payload.currentDate].availability

        if (!searchPayload) return currentAvailability

        const weekDay = dayjs(searchPayload.dateRange.start)
            .startOf('day')
            .day()

        const isWeekDayAvailable =
            payload.pricingPayload.hostingRules.availableWeekDays.includes(
                weekDay,
            )

        if (!isWeekDayAvailable) {
            currentAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.HOSTING_RULES,
                    UnavailabilityReason.WEEKDAY_NOT_AVAILABLE,
                ),
            )
        }

        if (
            searchPayload.totalStay <
            payload.calendar[payload.currentDate].finalMinStay
        ) {
            currentAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.HOSTING_RULES,
                    UnavailabilityReason.MIN_DAYS_NOT_REACHED,
                ),
            )
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
            currentAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.HOSTING_RULES,
                    UnavailabilityReason.MAX_GUESTS_EXCEEDED,
                ),
            )
        }

        return currentAvailability
    }
}
