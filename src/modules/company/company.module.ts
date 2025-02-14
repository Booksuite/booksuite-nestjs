import { Module } from '@nestjs/common'

import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { CompanyContactService } from './companyCategory.service'

@Module({
    providers: [CompanyService, CompanyContactService],
    controllers: [CompanyController],
})
export class CompanyModule {}
