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

import { UtilityLinksDTO } from './dtos/UtilityLinks.dto'
import { UtilityLinksPaginatedResponseDTO } from './dtos/UtilityLinksPaginatedResponse.dto'
import { UtilityLinksResponseDTO } from './dtos/UtilityLinksResponse.dto'
import { UtilityLinksSearchBodyDTO } from './dtos/UtilityLinksSearchBody.dto'
import { UtilityLinksUpdateDTO } from './dtos/UtilityLinksUpdate.dto'
import { UtilityLinksService } from './utilityLinks.service'

@Controller('company/:companyId/utilityLinks')
export class UtilityLinksController {
    constructor(private utilityLinksService: UtilityLinksService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(UtilityLinksResponseDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @ApiOperation({ operationId: 'getUtilityLink' })
    @Get(':id')
    @ApiParam({ name: 'companyId', type: String })
    getById(@Param('id') id: string): Promise<UtilityLinksResponseDTO | null> {
        return this.utilityLinksService.getById(id)
    }

    @ApiBody({ type: UtilityLinksDTO })
    @ApiOkResponse({ type: UtilityLinksResponseDTO })
    @Post()
    create(
        @Param('companyId') companyId: string,
        @Body() rawData: UtilityLinksDTO,
    ): Promise<UtilityLinksResponseDTO> {
        return this.utilityLinksService.create(companyId, rawData)
    }

    @ApiBody({ type: UtilityLinksUpdateDTO })
    @ApiOkResponse({ type: UtilityLinksResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() rawData: UtilityLinksUpdateDTO,
    ): Promise<UtilityLinksResponseDTO> {
        return this.utilityLinksService.update(id, rawData)
    }

    @ApiBody({ type: UtilityLinksSearchBodyDTO })
    @ApiOkResponse({ type: UtilityLinksPaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchUtilityLinks' })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: UtilityLinksSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<UtilityLinksPaginatedResponseDTO> {
        return await this.utilityLinksService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
