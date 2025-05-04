import { Body, Controller, Param, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import { AvailAndPricingService } from './availAndPricing.service'
import { CalculatePriceBody } from './dto/CalculatePriceBody.dto'
import { CalendarBodyDTO } from './dto/CalendarBody.dto'
import { HousingUnitTypeAvailAndPriceDTO } from './dto/HousingUnitTypeAvailAndPrice.dto'
import { HousingUnitTypeWithCalendarDTO } from './dto/HousingUnitTypeWithCalendar.dto'

@ApiTags('Availability and Pricing')
@Controller('/company/:companyId')
export class PricingController {
    constructor(private readonly pricingService: AvailAndPricingService) {}

    @Post('/calendar/:housingUnitTypeId')
    @ApiOperation({
        operationId: 'getCalendarFromHousingUnitTypeId',
        summary: 'Get calendar for a specific housing unit type',
    })
    @ApiParam({
        name: 'housingUnitTypeId',
        description: 'Housing unit type ID',
    })
    @ApiParam({
        name: 'companyId',
        description: 'Company ID',
    })
    @ApiOkResponse({
        description: 'Calendar data for the housing unit type',
        type: HousingUnitTypeWithCalendarDTO,
    })
    async getCalendarFromHousingUnitTypeId(
        @Param('housingUnitTypeId') housingUnitTypeId: string,
        @Body() body: CalendarBodyDTO,
    ): Promise<HousingUnitTypeWithCalendarDTO> {
        return this.pricingService.getCalendarFromHousingUnitTypeId(
            housingUnitTypeId,
            body.currentDate,
            body.viewWindow,
            body.search,
        )
    }

    @Post('/calendar')
    @ApiParam({
        name: 'companyId',
        type: String,
    })
    @ApiOperation({
        operationId: 'getCalendar',
        summary: 'Get calendar for all housing unit types in a company',
    })
    @ApiOkResponse({
        description: 'Calendar data for all housing unit types',
        type: [HousingUnitTypeWithCalendarDTO],
    })
    async getCalendar(
        @Param('companyId') companyId: string,
        @Body() body: CalendarBodyDTO,
    ): Promise<HousingUnitTypeWithCalendarDTO[]> {
        return this.pricingService.getCalendar(
            companyId,
            body.currentDate,
            body.viewWindow,
            body.search,
        )
    }

    @Post('/calculatePrice')
    @ApiParam({
        name: 'companyId',
        type: String,
    })
    @ApiOperation({
        operationId: 'calculatePrice',
        summary: 'Calculate price for all housing unit types in a company',
    })
    @ApiOkResponse({
        description: 'Summary of price data for all housing unit types',
        type: [HousingUnitTypeAvailAndPriceDTO],
    })
    async calculatePrice(
        @Param('companyId') companyId: string,
        @Body() body: CalculatePriceBody,
    ): Promise<HousingUnitTypeAvailAndPriceDTO[]> {
        return this.pricingService.getTotalPrices(
            companyId,
            body.currentDate,
            body.search,
        )
    }
}
