import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'
import { ServiceService } from './service.service'

@Controller('service')
export class SericeController {
    constructor(private experienceService: ServiceService) {}

    @Post('create')
    async create(@Body() experienceData: ServiceCreateDTO) {
        return this.experienceService.create(experienceData)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.experienceService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: ServiceCreateDTO) {
        return this.experienceService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.experienceService.delete(id)
    }
}
