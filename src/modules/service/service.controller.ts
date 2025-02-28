import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'
import { ServicePaginatedResponseDTO } from './dtos/ServicePaginatedResponse.dto'
import { ServiceResponseDTO } from './dtos/ServiceResponse.dto'
import { ServiceResponseFullDTO } from './dtos/ServiceResponseFull.dto'
import { ServiceSearchQueryDTO } from './dtos/ServiceSearchQuery.dto'
import { ServiceService } from './service.service'

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @ApiOkResponse({ type: ServiceResponseDTO })
    @Post('create')
    create(
        @Body() experienceData: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO> {
        return this.serviceService.create(experienceData)
    }

    @ApiOkResponse({ type: ServiceResponseFullDTO })
    @Get(':id')
    getById(@Param('id') id: string): Promise<ServiceResponseFullDTO | null> {
        return this.serviceService.getById(id)
    }

    @ApiOkResponse({ type: ServiceResponseDTO })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO | null> {
        return this.serviceService.update(id, data)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.serviceService.delete(id)
    }

    @ApiOkResponse({ type: ServicePaginatedResponseDTO })
    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() searchParams: ServiceSearchQueryDTO,
    ): Promise<ServicePaginatedResponseDTO> {
        const pagination: PaginationQueryDTO = {
            itemsPerPage: searchParams.itemsPerPage,
            page: searchParams.page,
        }

        return await this.serviceService.searchServices(
            companyId,
            pagination,
            searchParams,
        )
    }
}
