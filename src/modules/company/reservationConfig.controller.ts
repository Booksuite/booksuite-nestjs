import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { ReservationConfig } from '@prisma/client'

import { ReservationConfigDTO } from './dto/ReservationConfig.dto'
import { ReservationConfigService } from './reservationConfig.service'

@Controller('company/:companyId/reservationConfig')
export class ReservationConfigController {
    constructor(private reservationConfigService: ReservationConfigService) {}

    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<ReservationConfig | null> {
        return this.reservationConfigService.getByCompanyId(companyId)
    }

    @Patch()
    upsert(
        @Param('companyId') companyId: string,
        @Body() data: ReservationConfigDTO,
    ) {
        return this.reservationConfigService.upsert(companyId, data)
    }
}
