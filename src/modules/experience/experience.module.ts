import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { PrismaService } from 'src/prisma.service';
import { ExperienceController } from './experience.controller';

@Module({
  providers: [ExperienceService, PrismaService],
  controllers: [ExperienceController]
})
export class ExperienceModule {}
