import { Injectable } from '@nestjs/common'

import { PipeFns } from '@/common/utils/PipeFns'
import {
    Calendar,
    DayPricingPayload,
    HouseUnitTypePricingPayload,
    PricingRule,
} from '../types'

import { HostingRulesPricing } from './HostingRulesPricing'
import { OfferPricing } from './OfferPricing'
import { SeasonRulesPricing } from './SeasonRulesPricing'
import { SpecialDatesPricing } from './SpecialDatesPricing'

@Injectable()
export class PricingRules {
    constructor(
        private readonly pipeFns: PipeFns,
        private readonly seasonRules: SeasonRulesPricing,
        private readonly hostingRules: HostingRulesPricing,
        private readonly specialDates: SpecialDatesPricing,
        private readonly offers: OfferPricing,
    ) {}

    private readonly RULES: PricingRule[] = [
        this.hostingRules,
        this.seasonRules,
        this.specialDates,
        this.offers,
    ]

    applyRules(
        currentDate: string,
        payload: HouseUnitTypePricingPayload,
        currentCalendar: Calendar,
    ): Calendar {
        const pricingPayload: DayPricingPayload = {
            currentDate: currentDate,
            pricingPayload: { ...payload },
            calendar: { ...currentCalendar },
        }

        const response = this.pipeFns.pipe(
            ...this.RULES.map(
                (r) => (pl: DayPricingPayload) => r.apply?.(pl) || pl,
            ),
        )(pricingPayload)

        return response.calendar
    }
}
