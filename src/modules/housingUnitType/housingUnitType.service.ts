import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'
import { HousingUnitTypePaginatedResponseDTO } from './dto/HousingUnitTypePaginatedResponse.dto'
import { HousingUnitTypeResponseDTO } from './dto/HousingUnitTypeResponse.dto'
import { HousingUnitTypeResponseFullDTO } from './dto/HousingUnitTypeResponseFull.dto'
import { HousingUnitService } from './housingUnit.service'

@Injectable()
export class HousingUnitTypeService {
    constructor(
        private prismaService: PrismaService,
        private housingUnitService: HousingUnitService,
    ) {}

    async create(
        companyId: string,
        rawData: HousingUnitTypeCreateDTO,
    ): Promise<HousingUnitTypeResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeCreateInput>()({
                ...rawData,
                facilities: { createMany: { data: rawData.facilities } },
                medias: { createMany: { data: rawData.medias || [] } },
                housingUnits: {
                    createMany:
                        this.housingUnitService.normalizeHousingUnitsToCreateMany(
                            rawData.housingUnits,
                        ),
                },
                company: { connect: { id: companyId } },
            })

        const createdData = await this.prismaService.housingUnitType.create({
            data: normalizedData,
        })

        return createdData
    }

    getById(id: string): Promise<HousingUnitTypeResponseFullDTO | null> {
        return this.prismaService.housingUnitType.findUnique({
            where: { id },
            include: {
                housingUnits: true,
                facilities: { include: { facility: true } },
                medias: { include: { media: true } },
            },
        })
    }

    update(
        id: string,
        rawData: HousingUnitTypeCreateDTO,
    ): Promise<HousingUnitTypeResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeUpdateInput>()({
                ...rawData,
                facilities: {
                    deleteMany: {
                        housingUnitTypeId: id,
                        facilityId: {
                            notIn: rawData.facilities.map(
                                (facility) => facility.facilityId,
                            ),
                        },
                    },
                    createMany: { data: rawData.facilities },
                },
                medias: {
                    deleteMany: {
                        housingUnitTypeId: id,
                        mediaId: {
                            notIn: rawData.medias?.map(
                                (facility) => facility.mediaId,
                            ),
                        },
                    },
                    createMany: { data: rawData.medias || [] },
                },
                housingUnits: {
                    deleteMany:
                        this.housingUnitService.normalizeHousingUnitsToDelete(
                            id,
                            rawData.housingUnits,
                        ),
                    createMany:
                        this.housingUnitService.normalizeHousingUnitsToCreateMany(
                            rawData.housingUnits,
                        ),
                    updateMany:
                        this.housingUnitService.normalizeHousingUnitsToUpdate(
                            rawData.housingUnits,
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

    async listByCompanyId(
        companyId: string,
        pagination: PaginationQuery,
    ): Promise<HousingUnitTypePaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [housingUnitTypes, total] =
            await this.prismaService.housingUnitType.findManyAndCount({
                where: { companyId },
                ...paginationParams,
            })

        return buildPaginatedResponse(housingUnitTypes, total, pagination)
    }
}
