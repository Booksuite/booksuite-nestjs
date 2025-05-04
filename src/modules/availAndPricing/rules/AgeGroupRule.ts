import { Injectable } from '@nestjs/common'

import { UNAVAILABLE_REASON_MESSAGE } from '../constants'
import { UnavailableSource } from '../enum/UnavailableReason.enum'
import { UnavailabilityReason } from '../enum/UnavailableReason.enum'
import {
    AvailAndPricingAgeGroup,
    AvailAndPricingDayPayload,
    AvailAndPricingRule,
    HousingUnitTypeAvailability,
} from '../types'

@Injectable()
export class AgeGroupRule implements AvailAndPricingRule {
    apply(payload: AvailAndPricingDayPayload): AvailAndPricingDayPayload {
        const { currentDate, pricingPayload, calendar } = payload

        const ageGroupPrice = this.getAgeGroupPrice(
            calendar[currentDate].basePrice,
            pricingPayload.ageGroups,
        )

        calendar[currentDate].finalPrice += ageGroupPrice
        calendar[currentDate].availability = this.checkAvailability(payload)

        return payload
    }

    private checkAvailability(
        payload: AvailAndPricingDayPayload,
    ): HousingUnitTypeAvailability {
        const { searchPayload, housingUnitType } = payload.pricingPayload

        if (
            !searchPayload?.ageGroups ||
            !payload.calendar[payload.currentDate].availability.available
        )
            return payload.calendar[payload.currentDate].availability

        const totalChildren = searchPayload.ageGroups.reduce(
            (acc, curr) => acc + curr.quantity,
            0,
        )

        if (
            housingUnitType.maxChildren !== null &&
            totalChildren > housingUnitType.maxChildren
        ) {
            return {
                available: false,
                unavailabilitySource: UnavailableSource.HOSTING_RULES,
                unavailableReason: UnavailabilityReason.MAX_CHILDREN_EXCEEDED,
                unavailableReasonMessage:
                    UNAVAILABLE_REASON_MESSAGE[
                        UnavailabilityReason.MAX_CHILDREN_EXCEEDED
                    ],
            }
        }

        return payload.calendar[payload.currentDate].availability
    }

    private getAgeGroupPrice(
        dailyPrice: number,
        ageGroup: AvailAndPricingAgeGroup[],
    ): number {
        return ageGroup.reduce((acc, ageGroup) => {
            const ageGroupPrice = this.calculateAgeGroupPrice(
                dailyPrice,
                ageGroup,
            )

            return acc + ageGroupPrice
        }, 0)
    }

    private calculateAgeGroupPrice(
        dailyPrice: number,
        ageGroup: AvailAndPricingAgeGroup,
    ): number {
        if (!ageGroup.value || !ageGroup.quantity) return 0

        if (ageGroup.chargeType === 'DAILY_PER_CHILDREN')
            return ageGroup.value * ageGroup.quantity

        if (ageGroup.chargeType === 'DAILY_PERCENTAGE_PER_CHILDREN')
            return dailyPrice * (ageGroup.value / 100) * ageGroup.quantity

        return 0
    }
}
