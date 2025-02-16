import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { AgePolicyService } from './agePolicy.service'
import { AgePolicyCreateDTO } from './dto/AgePolicyCreate.dto'

@Controller('agePolicy')
export class AgePolicyController {
    constructor(private agePolicyService: AgePolicyService) {}

    @Post('create')
    create(@Body() data: AgePolicyCreateDTO) {
        return this.agePolicyService.create(data)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.agePolicyService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: AgePolicyCreateDTO) {
        return this.agePolicyService.update(id, data)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.agePolicyService.delete(id)
    }
}
