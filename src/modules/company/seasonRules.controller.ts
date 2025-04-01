import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { SeasonRulesDTO } from './dto/SeasonRules.dto'
import { SeasonRulesResponseDTO } from './dto/SeasonRulesResponse.dto'
import { SeasonRulesResponseFullDTO } from './dto/SeasonRulesResponseFull.dto'
import { SeasonRulesUpdateDTO } from './dto/SeasonRulesUpdate.dto'
import { SeasonRulesService } from './seasonRules.service'

@Controller('company/:companyId/seasonRules')
export class SeasonRulesController {
    constructor(private seasonRuleService: SeasonRulesService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(SeasonRulesResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    getById(
        @Param('id') id: string,
    ): Promise<SeasonRulesResponseFullDTO | null> {
        return this.seasonRuleService.getById(id)
    }

    @Post()
    @ApiBody({ type: SeasonRulesDTO })
    @ApiOkResponse({ type: SeasonRulesResponseDTO })
    create(
        @Param('companyId') companyId: string,
        @Body() rawData: SeasonRulesDTO,
    ): Promise<SeasonRulesResponseDTO> {
        return this.seasonRuleService.create(companyId, rawData)
    }

    @ApiBody({ type: SeasonRulesUpdateDTO })
    @ApiOkResponse({ type: SeasonRulesResponseFullDTO })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() rawData: SeasonRulesUpdateDTO,
    ): Promise<SeasonRulesResponseFullDTO> {
        return this.seasonRuleService.update(id, rawData)
    }
}
