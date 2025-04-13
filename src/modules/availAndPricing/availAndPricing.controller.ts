import { Controller, Get, Param, Query } from '@nestjs/common'
import {
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'

import { AvailAndPricingService } from './availAndPricing.service'
import { GetCalendarQueryDTO, GetCalendarResponseDTO } from './dto/calendar.dto'
import { HousingUnitTypeAvailability } from './types'

@ApiTags('Pricing')
@Controller('company/:companyId/calendar')
export class PricingController {
    constructor(private readonly pricingService: AvailAndPricingService) {}

    @Get(':housingUnitTypeId')
    @ApiOperation({
        operationId: 'getCalendarFromHousingUnitTypeId',
        summary: 'Get calendar for a specific housing unit type',
    })
    @ApiParam({
        name: 'housingUnitTypeId',
        description: 'Housing unit type ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Calendar data for the housing unit type',
        type: GetCalendarResponseDTO,
    })
    async getCalendarFromHousingUnitTypeId(
        @Param('housingUnitTypeId') housingUnitTypeId: string,
        @Query() query: GetCalendarQueryDTO,
    ): Promise<HousingUnitTypeAvailability> {
        return this.pricingService.getCalendarFromHousingUnitTypeId(
            housingUnitTypeId,
            query.currentDate,
            query.dateRange,
        )
    }

    @Get()
    @ApiOperation({
        operationId: 'getCalendar',
        summary: 'Get calendar for all housing unit types in a company',
    })
    @ApiQuery({ name: 'companyId', description: 'Company ID' })
    @ApiResponse({
        status: 200,
        description: 'Calendar data for all housing unit types',
        type: [GetCalendarResponseDTO],
    })
    async getCalendar(
        @Query('companyId') companyId: string,
        @Query() query: GetCalendarQueryDTO,
    ): Promise<HousingUnitTypeAvailability[]> {
        return this.pricingService.getCalendar(
            companyId,
            query.currentDate,
            query.dateRange,
        )
    }
}
