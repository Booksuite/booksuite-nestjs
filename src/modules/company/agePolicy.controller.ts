import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { AgePolicyService } from './agePolicy.service'
import { AgePolicyDTO } from './dto/AgePolicy.dto'
import { AgePolicyResponseDTO } from './dto/AgePolicyResponse.dto'
import { AgePolicyResponseFullDTO } from './dto/AgePolicyResponseFull.dto'

@ApiExtraModels(AgePolicyResponseDTO)
@Controller('company/:companyId/agePolicy')
export class AgePolicyController {
    constructor(private agePolicyService: AgePolicyService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(AgePolicyResponseDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<AgePolicyResponseDTO | null> {
        return this.agePolicyService.getByCompanyId(companyId)
    }

    @ApiOkResponse({ type: AgePolicyResponseFullDTO })
    @Patch()
    upsert(
        @Param('companyId') companyId: string,
        @Body() data: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
        return this.agePolicyService.upsert(companyId, data)
    }
}
