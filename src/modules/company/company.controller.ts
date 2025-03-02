import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { CompanyService } from './company.service'
import { CompanyCreateDTO } from './dto/CompanyCreate.dto'
import { CompanyResponseDTO } from './dto/CompanyResponse.dto'
import { CompanyResponseFullDTO } from './dto/CompanyResponseFull.dto'

@ApiExtraModels(CompanyResponseFullDTO)
@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @ApiOkResponse({ type: CompanyResponseDTO })
    @Post('create')
    createCompany(
        @Body() companyData: CompanyCreateDTO,
    ): Promise<CompanyResponseDTO> {
        return this.companyService.create(companyData)
    }

    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(CompanyResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    getCompanyByID(
        @Param('id') id: string,
    ): Promise<CompanyResponseFullDTO | null> {
        return this.companyService.getById(id)
    }

    @ApiOkResponse({ type: CompanyResponseDTO })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatedData: CompanyCreateDTO,
    ): Promise<CompanyResponseDTO> {
        return this.companyService.update(id, updatedData)
    }

    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyService.detele(id)
    }
}
