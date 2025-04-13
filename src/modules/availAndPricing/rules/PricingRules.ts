import { Injectable } from '@nestjs/common'

import { PipeFns } from '@/common/utils/PipeFns'
import {
    AvailAndPricingDayPayload,
    AvailAndPricingRule,
    Calendar,
    HouseUnitTypeAvailAndPricingPayload,
} from '../types'

import { HostingRulesRule } from './HostingRulesRule'
import { OfferRule } from './OfferPricing'
import { ReservationRule } from './ReservationRule'
import { SeasonRulesRule } from './SeasonRulesRule'
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
    ) {}

    private readonly RULES: AvailAndPricingRule[] = [
        this.hostingRules,
        this.seasonRules,
        this.specialDates,
        this.reservations,
        this.offers,
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
