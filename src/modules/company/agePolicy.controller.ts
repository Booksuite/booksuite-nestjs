import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { AgePolicyService } from './agePolicy.service'
import { AgePolicyDTO } from './dto/AgePolicy.dto'

@Controller('company/:companyId/agePolicy')
export class AgePolicyController {
    constructor(private agePolicyService: AgePolicyService) {}

    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<Prisma.AgePolicyGetPayload<{
        include: {
            ageGroups: true
        }
    }> | null> {
        return this.agePolicyService.getByCompanyId(companyId)
    }

    @Patch()
    upsert(@Param('companyId') companyId: string, @Body() data: AgePolicyDTO) {
        return this.agePolicyService.upsert(companyId, data)
    }
}
