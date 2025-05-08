import { Injectable } from '@nestjs/common'

import { PipeFns } from '@/common/utils/PipeFns'
import {
    AvailAndPricingDayPayload,
    AvailAndPricingRule,
    Calendar,
    HouseUnitTypeAvailAndPricingPayload,
} from '../types/payload'

import { AgeGroupRule } from './AgeGroupRule'
import { HostingRulesRule } from './HostingRulesRule'
import { OfferRule } from './OfferPricing'
import { ReservationRule } from './ReservationRule'
import { SeasonRulesRule } from './SeasonRulesRule'
import { ServiceRule } from './ServiceRule'
import { SpecialDatesRule } from './SpecialDatesRule'
@Injectable()
export class AvailAndPricingRules {
    constructor(
        private readonly pipeFns: PipeFns,
        private readonly seasonRules: SeasonRulesRule,
        private readonly hostingRules: HostingRulesRule,
        private readonly specialDates: SpecialDatesRule,
        private readonly offers: OfferRule,
        private readonly reservations: ReservationRule,
        private readonly ageGroupRule: AgeGroupRule,
        private readonly serviceRule: ServiceRule,
    ) {}

    private readonly RULES: AvailAndPricingRule[] = [
        this.hostingRules,
        this.seasonRules,
        this.specialDates,
        this.reservations,
        this.ageGroupRule,
        this.offers,
        this.serviceRule,
    ]

    applyRules(
        currentDate: string,
        payload: HouseUnitTypeAvailAndPricingPayload,
        currentCalendar: Calendar,
    ): Calendar {
        const pricingPayload: AvailAndPricingDayPayload = {
            currentDate: currentDate,
            pricingPayload: { ...payload },
            calendar: { ...currentCalendar },
        }

        const response = this.pipeFns.pipe(
            ...this.RULES.map(
                (r) => (pl: AvailAndPricingDayPayload) => r.apply?.(pl) || pl,
            ),
        )(pricingPayload)

        return response.calendar
    }
}
