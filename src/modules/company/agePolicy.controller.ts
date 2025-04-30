import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import {
    ApiBody,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    getSchemaPath,
} from '@nestjs/swagger'
import { v4 as uuidv4 } from 'uuid'

import { AgePolicyService } from './agePolicy.service'
import { AgePolicyDTO } from './dto/AgePolicy.dto'
import { AgePolicyResponseDTO } from './dto/AgePolicyResponse.dto'
import { AgePolicyResponseFullDTO } from './dto/AgePolicyResponseFull.dto'

@ApiExtraModels(AgePolicyResponseDTO, AgePolicyResponseFullDTO)
@Controller('company/:companyId/agePolicy')
export class AgePolicyController {
    constructor(private readonly agePolicyService: AgePolicyService) {}

    @ApiOperation({
        summary: 'Get age policy by company ID',
        operationId: 'getCompanyAgePolicy',
    })
    @ApiParam({ name: 'companyId', type: String, description: 'Company ID' })
    @ApiOkResponse({
        description: 'Age policy found or null',
        schema: {
            oneOf: [
                { $ref: getSchemaPath(AgePolicyResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @Get()
    async getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<AgePolicyResponseFullDTO | null> {
        return this.agePolicyService.getByCompanyId(companyId)
    }

    @ApiOperation({
        summary: 'Create or update age policy',
        operationId: 'upsertCompanyAgePolicy',
    })
    @ApiParam({ name: 'companyId', type: String, description: 'Company ID' })
    @ApiParam({
        name: 'id',
        type: String,
        description: 'Age Policy ID',
        required: false,
    })
    @ApiBody({ type: AgePolicyDTO })
    @ApiOkResponse({
        description: 'Age policy created or updated',
        type: AgePolicyResponseFullDTO,
    })
    @Patch(':id')
    async upsert(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() data: AgePolicyDTO,
    ): Promise<AgePolicyResponseFullDTO> {
        const policyId = id || uuidv4()
        return this.agePolicyService.upsert(companyId, policyId, data)
    }
}
