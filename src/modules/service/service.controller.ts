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
    @Post('create')
    create(
        @Param('companyId') companyId: string,
        @Body() experienceData: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO> {
        return this.serviceService.create(companyId, experienceData)
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
    @Get(':id')
    getById(@Param('id') id: string): Promise<ServiceResponseFullDTO | null> {
        return this.serviceService.getById(id)
    }

    @ApiOkResponse({ type: ServiceResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO | null> {
        return this.serviceService.update(id, data)
    }

    @ApiParam({ name: 'companyId', type: String })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.serviceService.delete(id)
    }

    @ApiBody({ type: ServiceSearchBodyDTO })
    @ApiOkResponse({ type: ServicePaginatedResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiQuery({ name: 'query', type: String, required: false })
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
