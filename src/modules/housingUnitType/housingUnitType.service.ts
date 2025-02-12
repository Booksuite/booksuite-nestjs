import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'

@Injectable()
export class HousingUnitTypeService {
    constructor(private prisma: PrismaService) {}

    create(rawData: HousingUnitTypeCreateDTO) {
        const normalizedData: Prisma.HousingUnitTypeCreateInput = omit(
            rawData,
            ['medias'],
        )

        if (rawData.medias)
            normalizedData.medias = { createMany: { data: rawData.medias } }

        return this.prisma.housingUnitType.create({ data: normalizedData })
    }

    getById(id: string) {
        return this.prisma.housingUnitType.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: HousingUnitTypeCreateDTO) {
        const normalizedData: Prisma.HousingUnitTypeUpdateInput = omit(
            rawData,
            ['medias'],
        )

        // if (rawData.medias)
        //     normalizedData.medias = { createMany: { data: rawData.medias } }

        return this.prisma.housingUnitType.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prisma.housingUnitType.delete({ where: { id: id } })
    }

    listByCompanyId(companyId: string) {
        return this.prisma.housingUnitType.findMany({
            where: { companyId },
        })
    }
}
