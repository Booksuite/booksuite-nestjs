import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Company } from '@/common/models/generated/models'

import { CompanyService } from './company.service'

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post('create')
    signUpCompany(@Body() companyData: Company) {
        return this.companyService.createCompany(companyData)
    }

    @Get(':id')
    getCompanyByID(@Param('id') id: string) {
        return this.companyService.getCompanyByID(parseInt(id))
    }

    @Get('/properties/:id')
    getCompanyProperties(@Param('id') id: string) {
        return this.companyService.getCompanyProperties(parseInt(id))
    }

    @Patch(':id')
    updateCompanyData(@Param('id') id: string, @Body() updatedData: Company) {
        return this.companyService.updateCompany(parseInt(id), updatedData)
    }

    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyService.deleteCompany(parseInt(id))
    }
}
