import { PrismaService } from '@/modules/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

import { ExperiencePayload } from './experience.interface'

@Injectable()
export class ExperienceService {
    constructor(private prisma: PrismaService) {}

    async createExperience(experienceData: ExperiencePayload) {
        const copy = experienceData.medias
        experienceData.medias = { create: [{ media: copy }] }

        return this.prisma.experience.create({ data: experienceData })
    }

    async getExperience(experienceID: number) {
        return this.prisma.experience.findUnique({
            where: { id: experienceID },
        })
    }

    async updateExperience(
        experienceData: ExperiencePayload,
        experienceID: number,
    ) {
        return this.prisma.experience.update({
            where: { id: experienceID },
            data: experienceData,
        })
    }

    async deleteExperience(experienceID: number) {
        return this.prisma.experience.delete({ where: { id: experienceID } })
    }
}
