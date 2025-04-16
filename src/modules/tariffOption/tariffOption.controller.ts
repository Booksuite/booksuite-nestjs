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

import { TariffOptionDTO } from './dto/TariffOption.dto'
import { TariffOptionPaginatedResponseDTO } from './dto/TariffOptionPaginatedResponse.dto'
import { TariffOptionResponseDTO } from './dto/TariffOptionResponse.dto'
import { TariffOptionResponseFullDTO } from './dto/TariffOptionResponseFull.dto'
import { TariffOptionSearchBodyDTO } from './dto/TariffOptionSearchBodyDTO.dto'
import { TariffOptionUpdateDTO } from './dto/TariffOptionUpdate.dto'
import { TariffOptionService } from './tariffOption.service'

@Controller('company/:companyId/tariffOption')
export class TariffOptionController {
    constructor(private tariffService: TariffOptionService) {}

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(TariffOptionResponseFullDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    @ApiParam({ name: 'companyId', type: String })
    getById(
        @Param('id') id: string,
    ): Promise<TariffOptionResponseFullDTO | null> {
        return this.tariffService.getById(id)
    }

    @ApiOkResponse({ type: TariffOptionResponseDTO })
    @ApiBody({ type: TariffOptionDTO })
    @Post()
    create(
        @Param('companyId') id: string,
        @Body() rawData: TariffOptionDTO,
    ): Promise<TariffOptionResponseDTO> {
        return this.tariffService.create(id, rawData)
    }

    @ApiOkResponse({ type: TariffOptionResponseFullDTO })
    @ApiBody({ type: TariffOptionResponseFullDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() rawData: TariffOptionUpdateDTO,
    ): Promise<TariffOptionResponseFullDTO> {
        return this.tariffService.update(id, rawData)
    }

    @ApiBody({ type: TariffOptionSearchBodyDTO })
    @ApiOkResponse({ type: TariffOptionPaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchTariffOption' })
    @ApiParam({ name: 'companyId', type: String })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: TariffOptionSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<TariffOptionPaginatedResponseDTO> {
        return await this.tariffService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
