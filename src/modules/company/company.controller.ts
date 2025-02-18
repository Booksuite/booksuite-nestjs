import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { CompanyService } from './company.service'
import { CompanyCreateDTO } from './dto/CompanyCreate.dto'

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post('create')
    createCompany(@Body() companyData: CompanyCreateDTO) {
        return this.companyService.create(companyData)
    }

    @Get(':id')
    getCompanyByID(@Param('id') id: string) {
        return this.companyService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatedData: CompanyCreateDTO) {
        return this.companyService.update(id, updatedData)
    }

    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyService.detele(id)
    }
}
