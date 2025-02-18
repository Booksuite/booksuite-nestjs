import { Body, Controller, Param, Post } from '@nestjs/common'

import { AgePolicyService } from './agePolicy.service'
import { AgePolicyCreateDTO } from './dto/AgePolicyCreate.dto'

@Controller('company/:companyId/agePolicy')
export class AgePolicyController {
    constructor(private agePolicyService: AgePolicyService) {}

    @Post('upsert')
    upsert(
        @Param('companyId') companyId: string,
        @Body() data: AgePolicyCreateDTO,
    ) {
        return this.agePolicyService.upsert(companyId, data)
    }
}
