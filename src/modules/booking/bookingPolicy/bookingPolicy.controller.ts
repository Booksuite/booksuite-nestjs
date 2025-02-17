import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { BookingPolicyCrateDTO } from '../dto/BookingPolicyCreate.dto'

import { BookingPolicyService } from './bookingPolicy.service'

@Controller('bookingPolicy')
export class BookingpolicyController {
    constructor(private bookingPolicyService: BookingPolicyService) {}

    @Post('create')
    create(@Body() policyData: BookingPolicyCrateDTO) {
        return this.bookingPolicyService.create(policyData)
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.bookingPolicyService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() policyData: BookingPolicyCrateDTO) {
        return this.bookingPolicyService.update(id, policyData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.bookingPolicyService.delete(id)
    }
}
