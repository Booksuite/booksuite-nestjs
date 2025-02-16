import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { AgePolicyCreateDTO } from './dto/AgePolicyCreate.dto'

@Injectable()
export class AgePolicyService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: AgePolicyCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.AgePolicyCreateInput>()({
            ...omit(rawData, ['ageGroups', 'companyId']),
            company: { connect: { id: rawData.companyId } },
            ageGroups: { createMany: { data: rawData.ageGroups } },
        })

        return this.prismaService.agePolicy.create({
            data: normalizedData,
        })
    }

    getById(id: string) {
        return this.prismaService.housingUnit.findUnique({
            where: { id: id },
        })
    }

    update(id: string, rawData: AgePolicyCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.AgePolicyUpdateInput>()({
            ...omit(rawData, ['ageGroups', 'companyId']),
            company: { connect: { id: rawData.companyId } },
            // ageGroups: { set: rawData.ageGroups },
        })

        return this.prismaService.agePolicy.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.housingUnit.delete({
            where: { id: id },
        })
    }
}
