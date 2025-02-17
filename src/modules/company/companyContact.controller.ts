import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { CompanyContactService } from './companyContact.service'
import { CompanyContactCreateDTO } from './dto/CompanyContactCreate.dto'
import { CompanyCreateDTO } from './dto/CompanyCreate.dto'

@Controller('company/:companyId/contact')
export class CompanyContactController {
    constructor(private companyContactService: CompanyContactService) {}

    @Post('create')
    create(@Body() data: CompanyContactCreateDTO) {
        return this.companyContactService.create(data)
    }

    @Get()
    list(@Param('id') id: string) {
        return this.companyContactService.getByID(id)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.companyContactService.getByID(id)
    }

    @Patch(':id')
    updateCompany(
        @Param('id') id: string,
        @Body() updatedData: CompanyCreateDTO,
    ) {
        return this.companyContactService.updateCompany(id, updatedData)
    }

    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyContactService.deleteCompany(id)
    }
}
