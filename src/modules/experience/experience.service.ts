import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ExperiencePayload } from './experience.interface'

@Injectable()
export class ExperienceService {
    constructor(private prisma: PrismaService) {}

    createExperience(experienceData: ExperiencePayload) {
        const copy = experienceData.medias
        experienceData.medias = { create: [{ media: copy }] }

        return this.prisma.experience.create({ data: experienceData })
    }

    getExperience(experienceID: number) {
        return this.prisma.experience.findUnique({
            where: { id: experienceID },
        })
    }

    updateExperience(experienceData: ExperiencePayload, experienceID: number) {
        return this.prisma.experience.update({
            where: { id: experienceID },
            data: experienceData,
        })
    }

    deleteExperience(experienceID: number) {
        return this.prisma.experience.delete({ where: { id: experienceID } })
    }
}
