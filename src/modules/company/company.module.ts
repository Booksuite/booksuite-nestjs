import { Module } from '@nestjs/common'

import { AgePolicyController } from './agePolicy.controller'
import { AgePolicyService } from './agePolicy.service'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { CompanyContactController } from './companyContact.controller'
import { CompanyContactService } from './companyContact.service'

@Module({
    providers: [CompanyService, CompanyContactService, AgePolicyService],
    controllers: [
        CompanyController,
        CompanyContactController,
        AgePolicyController,
    ],
})
export class CompanyModule {}
