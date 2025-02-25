import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'
import { ServiceSearchQueryDTO } from './dtos/ServiceSearchQuery.dto'
import { ServiceService } from './service.service'

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @Post('create')
    create(@Body() experienceData: ServiceCreateDTO) {
        return this.serviceService.create(experienceData)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.serviceService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: ServiceCreateDTO) {
        return this.serviceService.update(id, data)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.serviceService.delete(id)
    }

    @Post('search')
    async search(
        @Param('companyId') companyId: string,
        @Body() searchParams: ServiceSearchQueryDTO,
    ) {
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
