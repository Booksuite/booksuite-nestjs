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

import { SeasonRuleDTO } from './dto/SeasonRule.dto'
import { SeasonRuleResponseDTO } from './dto/SeasonRuleResponse.dto'
import { SeasonRuleResponseFullDTO } from './dto/SeasonRuleResponseFull.dto'
import { SeasonRulePaginatedResponseDTO } from './dto/SeasonRuleResponsePaginated.dto'
import { SeasonRuleSearchBodyDTO } from './dto/SeasonRuleSearchBody.dto'
import { SeasonRuleUpdateDTO } from './dto/SeasonRuleUpdate.dto'
import { SeasonRulesService } from './seasonRules.service'

@Controller('company/:companyId/seasonRules')
export class SeasonRulesController {
    constructor(private seasonRuleService: SeasonRulesService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(SeasonRuleResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    @ApiParam({ name: 'companyId', type: String })
    getById(
        @Param('id') id: string,
    ): Promise<SeasonRuleResponseFullDTO | null> {
        return this.seasonRuleService.getById(id)
    }

    @Post()
    @ApiBody({ type: SeasonRuleDTO })
    @ApiOkResponse({ type: SeasonRuleResponseDTO })
    create(
        @Param('companyId') companyId: string,
        @Body() rawData: SeasonRuleDTO,
    ): Promise<SeasonRuleResponseDTO> {
        return this.seasonRuleService.create(companyId, rawData)
    }

    @ApiBody({ type: SeasonRuleUpdateDTO })
    @ApiOkResponse({ type: SeasonRuleResponseFullDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() rawData: SeasonRuleUpdateDTO,
    ): Promise<SeasonRuleResponseFullDTO> {
        return this.seasonRuleService.update(id, rawData)
    }

    @ApiBody({ type: SeasonRuleSearchBodyDTO })
    @ApiOkResponse({ type: SeasonRulePaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'searchSeasonRules' })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: SeasonRuleSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<SeasonRulePaginatedResponseDTO> {
        return await this.seasonRuleService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
