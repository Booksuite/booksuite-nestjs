import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { CancellationPolicyService } from './cancellationPolicy.service'
import { CancellationPolicyCreateDTO } from './dto/CancellationPolicyCreate.dto'

@Controller('cancellation-policy')
export class CancellationPolicyController {
    constructor(private cancellationPolicyService: CancellationPolicyService) {}

    @Post('create')
    create(@Body() policyData: CancellationPolicyCreateDTO) {
        return this.cancellationPolicyService.create(policyData)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.cancellationPolicyService.getById(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() policyData: CancellationPolicyCreateDTO,
    ) {
        return this.cancellationPolicyService.update(id, policyData)
    }

    @Delete(':id')
    delete(id: string) {
        return this.cancellationPolicyService.delete(id)
    }
}
