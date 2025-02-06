import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CompanyService, PrismaService],
  controllers: [CompanyController]
})
export class CompanyModule {}
