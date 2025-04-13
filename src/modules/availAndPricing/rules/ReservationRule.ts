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
import { AvailAndPricingDayPayload } from '../types'
import { AvailAndPricingRule } from '../types'

@Injectable()
export class ReservationRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload } = payload

        const reservations = pricingPayload.reservations.filter(
            (reservation) => {
                const isBetween = dayjs
                    .utc(currentDate)
                    .isBetween(
                        dayjs.utc(reservation.startDate).startOf('day'),
                        dayjs.utc(reservation.endDate).endOf('day'),
                        'day',
                        '[]',
                    )

                return isBetween
            },
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

    private checkReservationAvailability(
        payload: AvailAndPricingDayPayload,
    ): boolean {
        if (!payload.calendar[payload.currentDate].reservations.length)
            return true

        const areAllHousingUnitsOccupied =
            payload.pricingPayload.housingUnitType.housingUnits.every(
                (housingUnit) =>
                    payload.calendar[payload.currentDate].reservations.some(
                        (reservation) =>
                            reservation.housingUnit?.id === housingUnit.id &&
                            OCCUPIED_RESERVATION_STATUS.includes(
                                reservation.status,
                            ),
                    ),
            )

        return areAllHousingUnitsOccupied
    }
}
