import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    getSchemaPath,
} from '@nestjs/swagger'

import { HostingRulesDTO } from './dto/HostingRules.dto'
import { HostingRulesResponseDTO } from './dto/HostingRulesResponse.dto'
import { HostingRulesService } from './hostingRules.service'

@ApiExtraModels(HostingRulesDTO)
@Controller('company/:companyId/hostingRules')
export class HostingRulesController {
    constructor(private hostingRulesService: HostingRulesService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(HostingRulesDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @ApiOperation({ operationId: 'getCompanyHostingRules' })
    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<HostingRulesResponseDTO | null> {
        return this.hostingRulesService.getByCompanyId(companyId)
    }

    @ApiOkResponse({ type: HostingRulesDTO })
    @ApiOperation({ operationId: 'upsertCompanyHostingRules' })
    @Patch()
    upsert(
        @Param('companyId') companyId: string,
        @Body() data: HostingRulesDTO,
    ): Promise<HostingRulesResponseDTO> {
        return this.hostingRulesService.upsert(companyId, data)
    }
}
