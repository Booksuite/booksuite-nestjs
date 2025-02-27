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
import { HousingUnitTypeFacilityService } from './housingUnitTypeFacility.service'
import { HousingUnitTypeMediaService } from './housingUnitTypeMedias.service'

@Injectable()
export class HousingUnitTypeService {
    constructor(
        private prismaService: PrismaService,
        private housingUnitService: HousingUnitService,
        private housingUnitMediaService: HousingUnitTypeMediaService,
        private housingUnitTypeFacilityService: HousingUnitTypeFacilityService,
    ) {}

    async create(
        id: string,
        rawData: HousingUnitTypeCreateDTO,
    ): Promise<HousingUnitTypeResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeCreateInput>()({
                ...rawData,
                facilities: {
                    create: this.housingUnitTypeFacilityService.normalizeFacilitiesToCreate(
                        rawData.facilities,
                    ),
                },
                medias: {
                    create: this.housingUnitMediaService.normalizeMediasToCreate(
                        rawData.medias,
                    ),
                },
                housingUnits: {
                    createMany:
                        this.housingUnitService.normalizeHousingUnitsToCreateMany(
                            rawData.housingUnits,
                        ),
                },
                company: { connect: { id } },
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
                facilities: {
                    create: this.housingUnitTypeFacilityService.normalizeFacilitiesToCreate(
                        rawData.facilities,
                    ),
                    update: this.housingUnitTypeFacilityService.normalizeFacilitiesToUpdate(
                        rawData.facilities,
                    ),
                    deleteMany:
                        this.housingUnitTypeFacilityService.normalizeFacilitiesToDelete(
                            id,
                            rawData.facilities,
                        ),
                },
                medias: {
                    create: this.housingUnitMediaService.normalizeMediasToCreate(
                        rawData.medias,
                    ),
                    update: this.housingUnitMediaService.normalizeMediasToUpdate(
                        rawData.medias,
                    ),
                    deleteMany:
                        this.housingUnitMediaService.normalizeMediasToDelete(
                            id,
                            rawData.medias,
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
