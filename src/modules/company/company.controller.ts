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
import { CompanyCreateDTO } from './dto/companyCreate.dto'

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Post('create')
    createCompany(@Body() companyData: CompanyCreateDTO) {
        return this.companyService.createCompany(companyData)
    }

    @Get('/:id')
    getCompanyByID(@Param('id') id: string) {
        return this.companyService.getCompanyByID(id)
    }

    @Patch(':id')
    updateCompany(
        @Param('id') id: string,
        @Body() updatedData: CompanyCreateDTO,
    ) {
        return this.companyService.updateCompany(id, updatedData)
    }

    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyService.deleteCompany(id)
    }
}
