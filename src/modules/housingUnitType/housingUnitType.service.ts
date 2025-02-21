import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { extracBatchUpdateSet } from '@/common/utils/extracBatchUpdateSet'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'
import { HousingUnitService } from './housingUnit.service'

@Injectable()
export class HousingUnitTypeService {
    constructor(
        private prismaService: PrismaService,
        private housingUnitService: HousingUnitService,
    ) {}

    create(id: string, rawData: HousingUnitTypeCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeCreateInput>()({
                ...omit(rawData, ['medias']),
                housingUnits: {
                    createMany:
                        this.housingUnitService.normalizeMediasToCreateMany(
                            rawData.housingUnits,
                        ),
                },
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
        const {
            idsToNotDelete: housingUnitsIdsToNotDelete,
            toCreate: housingUnitsToCreate,
            toUpdate: housingUnitsToUpdate,
        } = extracBatchUpdateSet(rawData.housingUnits)

        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeUpdateInput>()({
                ...omit(rawData, ['medias']),
                housingUnits: {
                    deleteMany: {
                        id: { notIn: housingUnitsIdsToNotDelete },
                        housingUnitTypeId: id,
                    },
                    createMany:
                        this.housingUnitService.normalizeMediasToCreateMany(
                            housingUnitsToCreate,
                        ),
                    updateMany:
                        this.housingUnitService.normalizeMediasToUpdate(
                            housingUnitsToUpdate,
                        ),
                },
            })

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
