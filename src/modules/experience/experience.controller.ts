import { ExperienceService } from './experience.service';
import { Body, Param, Controller, Post, Get, Res, Patch, Delete } from '@nestjs/common';
import { ExperiencePayload } from './experience.interface';
import { Response } from 'express';


@Controller('experience')
export class ExperienceController {

    constructor(private experienceService: ExperienceService) {}

    @Post("createExperience")
    async addExperience(@Body() experienceData: ExperiencePayload, @Res() res: Response) {
        try {
            if (Object.values(experienceData).length === 19) { 
                const createdData = await this.experienceService.createExperience(experienceData);
                
                if (!!createdData) { return res.status(201).json(createdData) }

            }
            return res.status(400).json({ message: "Data type is incorrectly formed." });
        } catch (error) {
            return res.status(500).json({ message: `(Internal Server Error) on creating experience data: ${error}` });
        }
    }

    @Get("getExperience/:id")
    async getExperienceByID(@Param("id") id: string, @Res() res: Response) {
        const returnedData = await this.experienceService.getExperience(parseInt(id));
        if (returnedData) {
            return res.status(200).json(returnedData);
        }
        return res.status(400).json({ message: "Data not found." });
    }

    @Patch("updateExperience/:id")
    async updateExperienceData(@Param("id") id: string, @Body() updatedData: ExperiencePayload, @Res() res: Response) {
        try {
            const newData = await this.experienceService.updateExperience(updatedData, parseInt(id));
            return res.status(200).json(newData);
        } catch (error) {
            return res.status(500).json({ message: `(Internal Server Error) on updating experience data: ${error}` });
        }
    }

    @Delete("deleteExperience/:id")
    async deleteExperience(@Param("id") id: string, @Res() res: Response) {
        const deletedData = await this.experienceService.deleteExperience(parseInt(id));
        if (deletedData) {
            return res.status(200).json({ message: `Experience deleted successfully.` });
        }
        return res.status(400).json({ message: `Experience not found with id(${id})` });
    }
}
