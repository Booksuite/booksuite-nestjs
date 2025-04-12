import { Module } from '@nestjs/common'

import { PricingHelpers } from './helpers/PricingHelpers'
import { PricingService } from './pricing.service'
import { HostingRulesPricing } from './rules/HostingRulesPricing'
import { OfferPricing } from './rules/OfferPricing'
import { PricingRules } from './rules/PricingRules'
import { ReservationRule } from './rules/ReservationRule'
import { SeasonRulesPricing } from './rules/SeasonRulesPricing'
import { SpecialDatesPricing } from './rules/SpecialDatesPricing'

@Module({
    providers: [
        PricingHelpers,
        PricingService,
        PricingRules,
        SeasonRulesPricing,
        ReservationRule,
        HostingRulesPricing,
        SpecialDatesPricing,
        OfferPricing,
    ],
})
export class PricingModule {}
