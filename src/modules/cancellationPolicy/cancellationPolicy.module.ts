import { Module } from '@nestjs/common'

import { CancellationPolicyController } from './cancellation-policy.controller'
import { CancellationPolicyService } from './cancellationPolicy.service'

@Module({
    providers: [CancellationPolicyService],
    controllers: [CancellationPolicyController],
})
export class CancellationPolicyModule {}
