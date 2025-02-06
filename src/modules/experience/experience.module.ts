import { Module } from '@nestjs/common'

import { ExperienceController } from './experience.controller'
import { ExperienceService } from './experience.service'

@Module({
    providers: [ExperienceService],
    controllers: [ExperienceController],
})
export class ExperienceModule {}
