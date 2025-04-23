import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { RateOptionDTO } from './dto/RateOption.dto'
import { RateOptionPaginatedResponseDTO } from './dto/RateOptionPaginatedResponse.dto'
import { RateOptionResponseDTO } from './dto/RateOptionResponse.dto'
import { RateOptionResponseFullDTO } from './dto/RateOptionResponseFull.dto'
import { RateOptionSearchBodyDTO } from './dto/RateOptionSearchBodyDTO.dto'
import { RateOptionUpdateDTO } from './dto/RateOptionUpdate.dto'
import { RateOptionService } from './rateOption.service'

@Controller('company/:companyId/rateOption')
export class RateOptionController {
    constructor(private rateService: RateOptionService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(RateOptionResponseFullDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'getRateOptionById' })
    getById(
        @Param('id') id: string,
    ): Promise<RateOptionResponseFullDTO | null> {
        return this.rateService.getById(id)
    }

    @ApiOkResponse({ type: RateOptionResponseDTO })
    @ApiBody({ type: RateOptionDTO })
    @ApiOperation({ operationId: 'createRateOption' })
    @Post()
    create(
        @Param('companyId') id: string,
        @Body() rawData: RateOptionDTO,
    ): Promise<RateOptionResponseDTO> {
        return this.rateService.create(id, rawData)
    }

    @ApiOkResponse({ type: RateOptionResponseFullDTO })
    @ApiBody({ type: RateOptionUpdateDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'updateRateOption' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() rawData: RateOptionUpdateDTO,
    ): Promise<RateOptionResponseFullDTO> {
        return this.rateService.update(id, rawData)
    }

    @ApiBody({ type: RateOptionSearchBodyDTO })
    @ApiOkResponse({ type: RateOptionPaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchRateOption' })
    @ApiParam({ name: 'companyId', type: String })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: RateOptionSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<RateOptionPaginatedResponseDTO> {
        return await this.rateService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
