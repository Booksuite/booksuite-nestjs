import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { CompanyBioService } from './companyBio.service'
import { CompanyBioDTO } from './dto/CompanyBio.dto'
import { CompanyBioPaginatedResponseDTO } from './dto/CompanyBioPaginatedResponse.dto'
import { CompanyBioResponseDTO } from './dto/CompanyBioResponse.dto'
import { CompanyBioSearchBodyDTO } from './dto/CompanyBioSearchBody.dto'
import { CompanyBioUpdateDTO } from './dto/CompanyBioUpdate.dto'

@Controller('company/:companyId/companyBio')
export class CompanyBioController {
    constructor(private companyBioService: CompanyBioService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(CompanyBioResponseDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @ApiOperation({ operationId: 'getCompanyBio' })
    @Get(':id')
    getById(@Param('id') id: string): Promise<CompanyBioResponseDTO | null> {
        return this.companyBioService.getById(id)
    }

    @ApiBody({ type: CompanyBioDTO })
    @ApiOkResponse({ type: CompanyBioResponseDTO })
    @Post()
    create(
        @Param('companyId') companyId: string,
        @Body() rawData: CompanyBioDTO,
    ): Promise<CompanyBioResponseDTO> {
        return this.companyBioService.create(companyId, rawData)
    }

    @ApiBody({ type: CompanyBioDTO })
    @ApiOkResponse({ type: CompanyBioResponseDTO })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() rawData: CompanyBioUpdateDTO,
    ): Promise<CompanyBioResponseDTO> {
        return this.companyBioService.update(id, rawData)
    }

    @ApiBody({ type: CompanyBioDTO })
    @ApiOkResponse({ type: CompanyBioResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchCompanyBio' })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: CompanyBioSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<CompanyBioPaginatedResponseDTO> {
        return await this.companyBioService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
