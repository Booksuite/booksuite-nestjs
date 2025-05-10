import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

import { OCCUPIED_RESERVATION_STATUS } from '../constants'
import {
    UnavailabilityReason,
    UnavailableSource,
} from '../enum/UnavailableReason.enum'
import { PricingHelpers } from '../helpers/PricingHelpers'
import {
    AvailAndPricingDayPayload,
    AvailAndPricingReservation,
    HousingUnitTypeAvailability,
} from '../types/payload'
import { AvailAndPricingRule } from '../types/payload'

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
        payload.calendar[currentDate].availability.push(
            ...this.checkReservationAvailability(payload),
        )

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
    ): HousingUnitTypeAvailability[] {
        const {
            pricingPayload: { searchPayload },
        } = payload

        if (!searchPayload) return []

        if (!payload.calendar[payload.currentDate].reservations.length)
            return []

        const newAvailability: HousingUnitTypeAvailability[] = []

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

        if (!hasAvailability) {
            newAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.RESERVATION,
                    UnavailabilityReason.ALL_ROOMS_OCCUPIED,
                ),
            )
        }

        return newAvailability
    }
}
