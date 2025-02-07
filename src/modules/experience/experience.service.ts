import { Injectable } from '@nestjs/common'

import { Experience } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class ExperienceService {
    constructor(private prisma: PrismaService) {}

    createExperience(experienceData: Experience) {
        return this.prisma.experience.create({ data: experienceData })
    }

    getExperience(experienceID: number) {
        return this.prisma.experience.findUnique({
            where: { id: experienceID },
        })
    }

    updateExperience(experienceData: Experience, experienceID: number) {
        return this.prisma.experience.update({
            where: { id: experienceID },
            data: experienceData,
        })
    }

    deleteExperience(experienceID: number) {
        return this.prisma.experience.delete({ where: { id: experienceID } })
    }
}
