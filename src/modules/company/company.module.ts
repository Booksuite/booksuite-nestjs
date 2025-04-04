import { Module } from '@nestjs/common'

import { AgePolicyController } from './agePolicy.controller'
import { AgePolicyService } from './agePolicy.service'
import { CancellationPolicyController } from './cancellationPolicy.controller'
import { CancellationPolicyService } from './cancellationPolicy.service'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { HostingRulesController } from './hostingRules.controller'
import { HostingRulesService } from './hostingRules.service'
import { ReservationConfigController } from './reservationConfig.controller'
import { ReservationConfigService } from './reservationConfig.service'
import { ReservationOptionsController } from './reservationOption.controller'
import { ReservationOptionService } from './reservationOption.service'
import { SeasonRulesController } from './seasonRules.controller'
import { SeasonRulesService } from './seasonRules.service'

@Module({
    providers: [
        CompanyService,
        AgePolicyService,
        ReservationConfigService,
        CancellationPolicyService,
        HostingRulesService,
        SeasonRulesService,
        ReservationOptionService,
    ],
    controllers: [
        CompanyController,
        AgePolicyController,
        ReservationConfigController,
        CancellationPolicyController,
        HostingRulesController,
        SeasonRulesController,
        ReservationOptionsController,
    ],
})
export class CompanyModule {}
