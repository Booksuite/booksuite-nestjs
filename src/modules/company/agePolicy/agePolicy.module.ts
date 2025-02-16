import { Module } from '@nestjs/common'

import { AgePolicyController } from './agePolicy.controller'
import { AgePolicyService } from './agePolicy.service'

@Module({
    providers: [AgePolicyService],
    controllers: [AgePolicyController],
})
export class AgePolicyModule {}
