import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { ReservationPolicy } from '@prisma/client'

import { ReservationPolicyDTO } from './dto/ReservationPolicy.dto'
import { ReservationPolicyService } from './reservationPolicy.service'

@Controller('company/:companyId/reservationPolicy')
export class ReservationPolicyController {
    constructor(private reservationPolicyService: ReservationPolicyService) {}

    @Patch()
    upsert(
        @Param('companyId') companyId: string,
        @Body() data: ReservationPolicyDTO,
    ) {
        return this.reservationPolicyService.upsert(companyId, data)
    }

    @Get()
    getById(
        @Param('companyId') companyId: string,
    ): Promise<ReservationPolicy | null> {
        return this.reservationPolicyService.getCompanyById(companyId)
    }

    @Delete()
    delete(@Param('companyId') companyId: string) {
        return this.reservationPolicyService.delete(companyId)
    }
}
