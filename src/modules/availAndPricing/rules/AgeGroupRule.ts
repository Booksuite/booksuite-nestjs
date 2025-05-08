import { Injectable } from '@nestjs/common'

import { UnavailableSource } from '../enum/UnavailableReason.enum'
import { UnavailabilityReason } from '../enum/UnavailableReason.enum'
import { PricingHelpers } from '../helpers/PricingHelpers'
import { AvailAndPricingAgeGroup } from '../types'
import {
    AvailAndPricingDayPayload,
    AvailAndPricingRule,
    HousingUnitTypeAvailability,
} from '../types/payload'

@Injectable()
export class AgeGroupRule implements AvailAndPricingRule {
    constructor(private readonly pricingHelpers: PricingHelpers) {}

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
    ): HousingUnitTypeAvailability[] {
        const { searchPayload, housingUnitType } = payload.pricingPayload

        const currentAvailability =
            payload.calendar[payload.currentDate].availability

        if (!searchPayload?.ageGroups) return currentAvailability

        const totalChildren = searchPayload.ageGroups.reduce(
            (acc, curr) => acc + curr.quantity,
            0,
        )

        if (
            housingUnitType.maxChildren !== null &&
            totalChildren > housingUnitType.maxChildren
        ) {
            currentAvailability.push(
                this.pricingHelpers.createAvailability(
                    false,
                    UnavailableSource.HOSTING_RULES,
                    UnavailabilityReason.MAX_CHILDREN_EXCEEDED,
                ),
            )
        }

        return currentAvailability
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
