import { Body, Controller, Param, Post, Query } from '@nestjs/common'
import {
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger'

import { AvailAndPricingService } from './availAndPricing.service'
import { AvailabilityAndPricingResponseDTO } from './dto/AvailabilityAndPricingResponse.dto'
import {} from './dto/calendar.dto'
import { CalendarBodyDTO } from './dto/get-calendar-query.dto'

@ApiTags('Availability and Pricing')
@Controller('company/:companyId/calendar')
export class PricingController {
    constructor(private readonly pricingService: AvailAndPricingService) {}

    @Post(':housingUnitTypeId')
    @ApiOperation({
        operationId: 'getCalendarFromHousingUnitTypeId',
        summary: 'Get calendar for a specific housing unit type',
    })
    @ApiParam({
        name: 'housingUnitTypeId',
        description: 'Housing unit type ID',
    })
    @ApiOkResponse({
        description: 'Calendar data for the housing unit type',
        type: AvailabilityAndPricingResponseDTO,
    })
    async getCalendarFromHousingUnitTypeId(
        @Param('housingUnitTypeId') housingUnitTypeId: string,
        @Body() body: CalendarBodyDTO,
    ): Promise<AvailabilityAndPricingResponseDTO> {
        return this.pricingService.getCalendarFromHousingUnitTypeId(
            housingUnitTypeId,
            body.currentDate,
            body.dateRange,
        )
    }

    @Post()
    @ApiOperation({
        operationId: 'getCalendar',
        summary: 'Get calendar for all housing unit types in a company',
    })
    @ApiQuery({ name: 'companyId', description: 'Company ID' })
    @ApiOkResponse({
        description: 'Calendar data for all housing unit types',
        type: [AvailabilityAndPricingResponseDTO],
    })
    async getCalendar(
        @Query('companyId') companyId: string,
        @Body() body: CalendarBodyDTO,
    ): Promise<AvailabilityAndPricingResponseDTO[]> {
        return this.pricingService.getCalendar(
            companyId,
            body.currentDate,
            body.dateRange,
        )
    }
}
