import { Module } from '@nestjs/common'

import { FacilityController } from './facility.controller'
import { FacilityService } from './facility.service'
import { AuthModule } from '../auth/auth.module'
import { AuthGuard } from '../auth/guards/auth.guard'

@Module({
    imports: [
        AuthModule
    ],
    providers: [
        FacilityService,
        AuthGuard
    ],
    controllers: [FacilityController],
})
export class FacilityModule {}
