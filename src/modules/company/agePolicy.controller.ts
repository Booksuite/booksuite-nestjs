import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { AgePolicyService } from './agePolicy.service'
import { AgePolicyDTO } from './dto/AgePolicy.dto'
import { AgePolicyResponseDTO } from './dto/AgePolicyResponse.dto'
import { AgePolicyResponseFullDTO } from './dto/AgePolicyResponseFull.dto'

@Controller('company/:companyId/agePolicy')
export class AgePolicyController {
    constructor(private agePolicyService: AgePolicyService) {}

    @ApiOkResponse({ type: AgePolicyResponseDTO })
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
