import { Module } from '@nestjs/common'

import { PipeFns } from '@/common/utils/PipeFns'

import { PricingController } from './availAndPricing.controller'
import { AvailAndPricingService } from './availAndPricing.service'
import { PricingHelpers } from './helpers/PricingHelpers'
import { AgeGroupRule } from './rules/AgeGroupRule'
import { HostingRulesRule } from './rules/HostingRulesRule'
import { OfferRule } from './rules/OfferPricing'
import { AvailAndPricingRules } from './rules/PricingRules'
import { RateOptionRule } from './rules/rateOption'
import { ReservationRule } from './rules/ReservationRule'
import { SeasonRulesRule } from './rules/SeasonRulesRule'
import { ServiceRule } from './rules/ServiceRule'
import { SpecialDatesRule } from './rules/SpecialDatesRule'

@Module({
    controllers: [PricingController],
    providers: [
        PipeFns,
        AvailAndPricingService,
        AvailAndPricingRules,
        PricingHelpers,
        SeasonRulesRule,
        ReservationRule,
        HostingRulesRule,
        SpecialDatesRule,
        OfferRule,
        AgeGroupRule,
        ServiceRule,
        RateOptionRule,
    ],
})
export class AvailAndPricingModule {}
