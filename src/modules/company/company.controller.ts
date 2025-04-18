import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBody,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { CompanyService } from './company.service'
import { CompanyCreateDTO } from './dto/CompanyCreate.dto'
import { CompanyOrderByDTO } from './dto/CompanyOrderBy.dto'
import { CompanyResponseDTO } from './dto/CompanyResponse.dto'
import { CompanyResponseFullDTO } from './dto/CompanyResponseFull.dto'
import { CompanyResponsePaginatedDTO } from './dto/CompanyResponsePaginated.dto'
import { CompanySearchBodyDTO } from './dto/CompanySearchBody.dto'
import { CompanySearchFilterDTO } from './dto/CompanySearchFilter.dto'
import { CompanyUpdateDTO } from './dto/CompanyUpdate.dto'

@ApiExtraModels(
    CompanyResponseFullDTO,
    PaginationQueryDTO,
    CompanyOrderByDTO,
    CompanySearchFilterDTO,
)
@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @ApiOkResponse({ type: CompanyResponseDTO })
    @ApiOperation({ operationId: 'createCompany' })
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
    @ApiOperation({ operationId: 'getCompanyById' })
    @Get(':id')
    getCompanyByID(
        @Param('id') id: string,
    ): Promise<CompanyResponseFullDTO | null> {
        return this.companyService.getById(id)
    }

    @ApiBody({ type: CompanyUpdateDTO })
    @ApiOkResponse({ type: CompanyResponseDTO })
    @ApiOperation({ operationId: 'updateCompany' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatedData: CompanyUpdateDTO,
    ): Promise<CompanyResponseDTO> {
        return this.companyService.update(id, updatedData)
    }

    @ApiBody({ type: CompanySearchBodyDTO })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOkResponse({ type: CompanyResponsePaginatedDTO })
    @ApiOperation({ operationId: 'searchCompanies' })
    @Post('search')
    search(
        @Query('query') query: string,
        @Body() body: CompanySearchBodyDTO,
    ): Promise<CompanyResponsePaginatedDTO> {
        return this.companyService.search(
            body.pagination,
            body.order,
            query,
            body.filter,
        )
    }

    @ApiOperation({ operationId: 'deleteCompany' })
    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyService.detele(id)
    }
}
