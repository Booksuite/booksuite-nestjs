import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExperiencePayload } from './experience.interface';

@Injectable()
export class ExperienceService {

    constructor(private prisma: PrismaService) {}

    async createExperience(experienceData: ExperiencePayload) {
        const copy = experienceData.medias
        experienceData.medias = {create: [{media: copy}]}
        console.log(copy)
        return this.prisma.experience.create({ data: experienceData});
    }

    async getExperience(experienceID: number) {
        return this.prisma.experience.findUnique({ where: { id: experienceID } });
    }

    async updateExperience(experienceData: ExperiencePayload, experienceID: number) {
        return this.prisma.experience.update({
            where: { id: experienceID },
            data: experienceData
        });
    }

    async deleteExperience(experienceID: number) {
        return this.prisma.experience.delete({ where: { id: experienceID } });
    }

}
