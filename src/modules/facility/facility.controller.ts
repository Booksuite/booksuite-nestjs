import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { FacilityDTO } from './dto/Facility.dto'
import { FacilityService } from './facility.service'

@Controller('facility')
export class FacilityController {
    constructor(private facilityService: FacilityService) {}

    @Post('create')
    create(@Body() facilityData: FacilityDTO) {
        return this.facilityService.create(facilityData)
    }

    @Get(':id')
    getById(@Param('id') facilityId: string) {
        return this.facilityService.getById(facilityId)
    }

    @Patch(':id')
    update(@Param('id') facilityId: string, facilityData: FacilityDTO) {
        return this.facilityService.update(facilityId, facilityData)
    }

    @Delete(':id')
    delete(@Param('id') facilityId: string) {
        return this.facilityService.delete(facilityId)
    }
}
