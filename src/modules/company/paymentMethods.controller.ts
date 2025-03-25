import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { PaymentMethodsDTO } from './dto/PaymentMethods.dto'
import { PaymentMethodsResponseDTO } from './dto/PaymentMethodsResponse.dto'
import { PaymentMethodsService } from './paymentMethods.service'

@Controller('company/:companyId/paymentMethods')
export class PaymentMethodsController {
    constructor(private paymentMethodsService: PaymentMethodsService) {}

    @Get()
    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(PaymentMethodsResponseDTO) },
                { type: 'null' },
            ],
        },
    })
    @ApiBody({ type: PaymentMethodsDTO })
    getByCompanyId(
        @Param('companyId') id: string,
    ): Promise<PaymentMethodsResponseDTO | null> {
        return this.paymentMethodsService.getByCompanyId(id)
    }

    @Post()
    @ApiBody({ type: PaymentMethodsDTO })
    @ApiOkResponse({ type: PaymentMethodsResponseDTO })
    upsert(
        @Param('companyId') id: string,
        @Body() rawData: PaymentMethodsDTO,
    ): Promise<PaymentMethodsResponseDTO> {
        return this.paymentMethodsService.upsert(id, rawData)
    }
}
