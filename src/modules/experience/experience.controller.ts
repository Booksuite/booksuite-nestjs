import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { Experience } from '@/common/models/generated/models'

import { ExperienceService } from './experience.service'

@Controller('experience')
export class ExperienceController {
    constructor(private experienceService: ExperienceService) {}

    @Post('create')
    addExperience(@Body() experienceData: Experience) {
        return this.experienceService.createExperience(experienceData)
    }

    @Get(':id')
    getExperienceByID(@Param('id') id: string) {
        return this.experienceService.getExperience(parseInt(id))
    }

    @Patch(':id')
    updateExperienceData(
        @Param('id') id: string,
        @Body() updatedData: Experience,
    ) {
        return this.experienceService.updateExperience(
            updatedData,
            parseInt(id),
        )
    }

    @Delete(':id')
    deleteExperience(@Param('id') id: string) {
        return this.experienceService.deleteExperience(parseInt(id))
    }
}
