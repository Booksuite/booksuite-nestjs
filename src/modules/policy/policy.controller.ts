import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Policy } from '@/common/models/generated/models'

import { PolicyService } from './policy.service'

@Controller('policy')
export class PolicyController {
    constructor(private policyService: PolicyService) {}

    @Post('create')
    createPolicy(@Body() policyData: Policy) {
        return this.policyService.createPolicy(policyData)
    }

    @Get(':id')
    getPolicy(@Param('id') id: string) {
        return this.policyService.getPolicy(parseInt(id))
    }

    @Patch(':id')
    updatePolicy(@Param('id') id: string, @Body() policyData: Policy) {
        return this.policyService.updatePolicy(policyData, parseInt(id))
    }

    @Delete(':id')
    deletePolicy(@Param('id') id: string) {
        return this.policyService.deletePolicy(parseInt(id))
    }
}
