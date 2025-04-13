import { Module } from '@nestjs/common'

import { PricingController } from './availAndPricing.controller'
import { AvailAndPricingService } from './availAndPricing.service'
import { PricingHelpers } from './helpers/PricingHelpers'
import { HostingRulesRule } from './rules/HostingRulesRule'
import { OfferRule } from './rules/OfferPricing'
import { AvailAndPricingRules } from './rules/PricingRules'
import { ReservationRule } from './rules/ReservationRule'
import { SeasonRulesRule } from './rules/SeasonRulesRule'
import { SpecialDatesRule } from './rules/SpecialDatesRule'

@Module({
    controllers: [PricingController],
    providers: [
        AvailAndPricingService,
        AvailAndPricingRules,
        PricingHelpers,
        SeasonRulesRule,
        ReservationRule,
        HostingRulesRule,
        SpecialDatesRule,
        OfferRule,
    ],
})
export class PricingModule {}
