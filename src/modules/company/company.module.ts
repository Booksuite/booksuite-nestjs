import { Module } from '@nestjs/common'

import { AgePolicyController } from './agePolicy.controller'
import { AgePolicyService } from './agePolicy.service'
import { CancellationPolicyController } from './cancellationPolicy.controller'
import { CancellationPolicyService } from './cancellationPolicy.service'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { ReservationConfigController } from './reservationConfig.controller'
import { ReservationConfigService } from './reservationConfig.service'
import { ReservationPolicyController } from './reservationPolicy.controller'
import { ReservationPolicyService } from './reservationPolicy.service'

@Module({
    providers: [
        CompanyService,
        AgePolicyService,
        ReservationConfigService,
        CancellationPolicyService,
        ReservationPolicyService,
    ],
    controllers: [
        CompanyController,
        AgePolicyController,
        ReservationConfigController,
        CancellationPolicyController,
        ReservationPolicyController,
    ],
})
export class CompanyModule {}
