import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

import { ExperienceController } from './experience.controller'
import { ExperienceService } from './experience.service'

@Module({
    providers: [ExperienceService, PrismaService],
    controllers: [ExperienceController],
})
export class ExperienceModule {}
