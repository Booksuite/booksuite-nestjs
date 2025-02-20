import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { CancellationPolicyService } from './cancellationPolicy.service'
import { CancellationPolicyDTO } from './dto/CancellationPolicy.dto'

@Controller('company/:companyId/cancellationPolicy')
export class CancellationPolicyController {
    constructor(private cancellationPolicyService: CancellationPolicyService) {}

    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<Prisma.CancellationPolicyGetPayload<{
        include: { penaltyRanges: true }
    }> | null> {
        return this.cancellationPolicyService.getByCompanyId(companyId)
    }

    @Patch('create')
    create(
        @Param('companyId') companyId: string,
        @Body() data: CancellationPolicyDTO,
    ) {
        return this.cancellationPolicyService.upsert(companyId, data)
    }

    @Delete()
    delete(@Param('companyId') companyId: string) {
        return this.cancellationPolicyService.delete(companyId)
    }
}
