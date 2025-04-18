import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    getSchemaPath,
} from '@nestjs/swagger'

import { CancellationPolicyService } from './cancellationPolicy.service'
import { CancellationPolicyDTO } from './dto/CancellationPolicy.dto'
import { CancellationPolicyResponseFullDTO } from './dto/CancellationPolicyResponseFull.dto'

@ApiExtraModels(CancellationPolicyResponseFullDTO)
@Controller('company/:companyId/cancellationPolicy')
export class CancellationPolicyController {
    constructor(private cancellationPolicyService: CancellationPolicyService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(CancellationPolicyResponseFullDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @ApiOperation({ operationId: 'getCompanyCancellationPolicy' })
    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<CancellationPolicyResponseFullDTO | null> {
        return this.cancellationPolicyService.getByCompanyId(companyId)
    }

    @ApiOkResponse({ type: CancellationPolicyResponseFullDTO })
    @ApiOperation({ operationId: 'upsertCompanyCancellationPolicy' })
    @Patch()
    create(
        @Param('companyId') companyId: string,
        @Body() data: CancellationPolicyDTO,
    ): Promise<CancellationPolicyResponseFullDTO> {
        return this.cancellationPolicyService.upsert(companyId, data)
    }

    @ApiOperation({ operationId: 'deleteCompanyCancellationPolicy' })
    @Delete()
    delete(@Param('companyId') companyId: string) {
        return this.cancellationPolicyService.delete(companyId)
    }
}
