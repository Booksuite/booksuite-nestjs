import { Body, Controller, Get, Param, Patch } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { ReservationConfigDTO } from './dto/ReservationConfig.dto'
import { ReservationConfigResponseDTO } from './dto/ReservationConfigResponse.dto'
import { ReservationConfigService } from './reservationConfig.service'

@ApiExtraModels(ReservationConfigResponseDTO)
@Controller('company/:companyId/reservationConfig')
export class ReservationConfigController {
    constructor(private reservationConfigService: ReservationConfigService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(ReservationConfigResponseDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @Get()
    getByCompanyId(
        @Param('companyId') companyId: string,
    ): Promise<ReservationConfigResponseDTO | null> {
        return this.reservationConfigService.getByCompanyId(companyId)
    }

    @ApiOkResponse({ type: ReservationConfigResponseDTO })
    @Patch()
    upsert(
        @Param('companyId') companyId: string,
        @Body() data: ReservationConfigDTO,
    ): Promise<ReservationConfigResponseDTO> {
        return this.reservationConfigService.upsert(companyId, data)
    }
}
