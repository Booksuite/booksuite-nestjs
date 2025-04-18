import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    getSchemaPath,
} from '@nestjs/swagger'

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
                    $ref: getSchemaPath(AgePolicyResponseFullDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @ApiOperation({ operationId: 'getCompanyAgePolicy' })
    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<AgePolicyResponseFullDTO | null> {
        return this.agePolicyService.getByCompanyId(companyId)
    }

    @ApiOkResponse({ type: AgePolicyResponseFullDTO })
    @ApiOperation({ operationId: 'upsertCompanyAgePolicy' })
    @Patch(':id')
    upsert(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() data: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
        return this.agePolicyService.upsert(companyId, id, data)
    }
}
