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
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { SpecialDateCreateDTO } from './dtos/SpecialDateCreate.dto'
import { SpecialDatePaginatedResponseDTO } from './dtos/SpecialDatePaginatedResponse.dto'
import { SpecialDateResponseDTO } from './dtos/SpecialDateResponse.dto'
import { SpecialDateResponseFullDTO } from './dtos/SpecialDateResponseFull.dto'
import { SpecialDateSearchBodyDTO } from './dtos/SpecialDateSearchBody.dto'
import { SpecialDateUpdateDTO } from './dtos/SpecialDateUpdate.dto'
import { SpecialDateService } from './specialDate.service'

@ApiExtraModels(SpecialDateResponseFullDTO)
@Controller('company/:companyId/specialDates')
export class SpecialDateController {
    constructor(private readonly specialDateService: SpecialDateService) {}

    @ApiOperation({ operationId: 'createSpecialDate' })
    @ApiOkResponse({ type: SpecialDateResponseDTO })
    @Post()
    create(
        @Param('companyId') companyId: string,
        @Body() data: SpecialDateCreateDTO,
    ): Promise<SpecialDateResponseDTO> {
        return this.specialDateService.create(companyId, data)
    }

    @ApiOperation({ operationId: 'getSpecialDateById' })
    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(SpecialDateResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    getById(
        @Param('id') id: string,
    ): Promise<SpecialDateResponseFullDTO | null> {
        return this.specialDateService.getById(id)
    }

    @ApiOperation({ operationId: 'updateSpecialDate' })
    @ApiOkResponse({ type: SpecialDateResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: SpecialDateUpdateDTO,
    ): Promise<SpecialDateResponseDTO> {
        return this.specialDateService.update(id, data)
    }

    @ApiBody({ type: SpecialDateSearchBodyDTO })
    @ApiOkResponse({ type: SpecialDatePaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchSpecialDates' })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: SpecialDateSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<SpecialDatePaginatedResponseDTO> {
        return await this.specialDateService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
