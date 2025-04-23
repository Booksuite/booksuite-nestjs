import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import {
    OCCUPIED_RESERVATION_STATUS,
    UNAVAILABLE_REASON_MESSAGE,
} from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { PricingHelpers } from '../helpers/PricingHelpers'
import { AvailAndPricingDayPayload, AvailAndPricingReservation } from '../types'
import { AvailAndPricingRule } from '../types'

@Injectable()
export class ReservationRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    /**
     * Search for reservations that conflict with the current date and check the availability of EACH housing unit
     * @param payload Search payload
     * @returns Search payload with the reservations that conflict with the current date
     */
    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload } = payload
        const { searchPayload } = pricingPayload

        if (!searchPayload) return payload

        const searchStartDate = dayjs
            .utc(searchPayload.dateRange.start)
            .startOf('day')
        const searchEndDate = dayjs
            .utc(searchPayload.dateRange.end)
            .subtract(1, 'day')
            .endOf('day')

        const reservations = pricingPayload.reservations.filter((reservation) =>
            this.conflictsWithReservations(
                reservation,
                searchStartDate,
                searchEndDate,
            ),
        )

        if (!reservations.length) return payload

        payload.calendar[currentDate].reservations = reservations

        if (!this.checkReservationAvailability(payload)) {
            payload.calendar[currentDate].availability.available = false
            payload.calendar[currentDate].availability.unavailabilitySource =
                UnavailableSource.RESERVATION
            payload.calendar[currentDate].availability.unavailableReason =
                UnavailabilityReason.ALL_ROOMS_OCCUPIED
            payload.calendar[
                currentDate
            ].availability.unavailableReasonMessage =
                UNAVAILABLE_REASON_MESSAGE[
                    UnavailabilityReason.ALL_ROOMS_OCCUPIED
                ]
        }

        return payload
    }

    private conflictsWithReservations(
        reservation: AvailAndPricingReservation,
        searchStartDate: dayjs.Dayjs,
        searchEndDate: dayjs.Dayjs,
    ): boolean {
        const reservationStartDate = dayjs
            .utc(reservation.startDate)
            .startOf('day')
        const reservationEndDate = dayjs
            .utc(reservation.endDate)
            .subtract(1, 'day')
            .endOf('day')

        const isSearchStartBetweenReservationStart = searchStartDate.isBetween(
            reservationStartDate,
            reservationEndDate,
            'day',
            '[]',
        )

        const isSearchEndBetweenReservationStartAndEnd =
            searchEndDate.isBetween(
                reservationStartDate,
                reservationEndDate,
                'day',
                '[]',
            )

        const isSearchRangeAroundReservation =
            searchStartDate.isSameOrBefore(reservationStartDate, 'day') &&
            searchEndDate.isSameOrAfter(reservationEndDate, 'day')

        return (
            isSearchRangeAroundReservation ||
            isSearchStartBetweenReservationStart ||
            isSearchEndBetweenReservationStartAndEnd
        )
    }

    private checkReservationAvailability(
        payload: AvailAndPricingDayPayload,
    ): boolean {
        const {
            pricingPayload: { searchPayload },
        } = payload

        if (!searchPayload) return true

        if (!payload.calendar[payload.currentDate].reservations.length)
            return true

        const searchStartDate = dayjs
            .utc(searchPayload.dateRange.start)
            .startOf('day')
        const searchEndDate = dayjs
            .utc(searchPayload.dateRange.end)
            .subtract(1, 'day')
            .endOf('day')

        const hasAvailability =
            payload.pricingPayload.housingUnitType.housingUnits.some(
                (housingUnit) => {
                    const hasAvailabilityInSomeHousingUnit = !payload.calendar[
                        payload.currentDate
                    ].reservations.some((reservation) => {
                        if (reservation.housingUnit?.id !== housingUnit.id)
                            return false

                        if (
                            !OCCUPIED_RESERVATION_STATUS.includes(
                                reservation.status,
                            )
                        )
                            return false

                        const conflicts = this.conflictsWithReservations(
                            reservation,
                            searchStartDate,
                            searchEndDate,
                        )

                        return conflicts
                    })

                    return hasAvailabilityInSomeHousingUnit
                },
            )

        return hasAvailability
    }
}
