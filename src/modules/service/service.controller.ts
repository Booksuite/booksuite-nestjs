import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBody,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    getSchemaPath,
} from '@nestjs/swagger'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'
import { ServicePaginatedResponseDTO } from './dtos/ServicePaginatedResponse.dto'
import { ServiceResponseDTO } from './dtos/ServiceResponse.dto'
import { ServiceResponseFullDTO } from './dtos/ServiceResponseFull.dto'
import { ServiceSearchBodyDTO } from './dtos/ServiceSearchBody.dto'
import { ServiceService } from './service.service'

@ApiExtraModels(ServiceResponseFullDTO)
@Controller('company/:companyId/service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @ApiOkResponse({ type: ServiceResponseDTO })
    @ApiOperation({ operationId: 'createService' })
    @Post('create')
    create(
        @Param('companyId') companyId: string,
        @Body() data: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO> {
        return this.serviceService.create(companyId, data)
    }

    @ApiOkResponse({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(ServiceResponseFullDTO) },
                { type: 'null' },
            ],
        },
    })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'getServiceById' })
    @Get(':id')
    getById(@Param('id') id: string): Promise<ServiceResponseFullDTO | null> {
        return this.serviceService.getById(id)
    }

    @ApiOkResponse({ type: ServiceResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'updateService' })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO | null> {
        return this.serviceService.update(id, data)
    }

    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'deleteService' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.serviceService.delete(id)
    }

    @ApiBody({ type: ServiceSearchBodyDTO })
    @ApiOkResponse({ type: ServicePaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchServices' })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() body: ServiceSearchBodyDTO,
        @Query('query') query: string,
    ): Promise<ServicePaginatedResponseDTO> {
        return await this.serviceService.search(
            companyId,
            body.pagination,
            body.order,
            body.filter,
            query,
        )
    }
}
