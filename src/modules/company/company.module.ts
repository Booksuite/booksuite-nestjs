import { Module } from '@nestjs/common'

import { AgePolicyController } from './agePolicy.controller'
import { AgePolicyService } from './agePolicy.service'
import { CancellationPolicyController } from './cancellationPolicy.controller'
import { CancellationPolicyService } from './cancellationPolicy.service'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { PaymentMethodsController } from './paymentMethods.controller'
import { PaymentMethodsService } from './paymentMethods.service'
import { ReservationConfigController } from './reservationConfig.controller'
import { ReservationConfigService } from './reservationConfig.service'

@Module({
    providers: [
        CompanyService,
        AgePolicyService,
        ReservationConfigService,
        CancellationPolicyService,
        PaymentMethodsService,
    ],
    controllers: [
        CompanyController,
        AgePolicyController,
        ReservationConfigController,
        CancellationPolicyController,
        PaymentMethodsController,
    ],
})
export class CompanyModule {}
