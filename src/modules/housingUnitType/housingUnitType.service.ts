import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'

@Injectable()
export class HousingUnitTypeService {
    constructor(private prismaService: PrismaService) {}

    create(id: string, rawData: HousingUnitTypeCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeCreateInput>()({
                ...omit(rawData, ['medias']),
                company: { connect: { id: id } },
            })

        return this.prismaService.housingUnitType.create({
            data: normalizedData,
        })
    }

    getById(id: string) {
        return this.prismaService.housingUnitType.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: HousingUnitTypeCreateDTO) {
        const normalizedData: Prisma.HousingUnitTypeUpdateInput = omit(
            rawData,
            ['medias'],
        )

        return this.prismaService.housingUnitType.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.housingUnitType.delete({ where: { id: id } })
    }

    listByCompanyId(companyId: string) {
        return this.prismaService.housingUnitType.findMany({
            where: { companyId },
        })
    }
}
