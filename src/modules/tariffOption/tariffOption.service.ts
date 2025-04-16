import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { pick } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { TariffOptionDTO } from './dto/TariffOption.dto'
import { TariffOptionOrderByDTO } from './dto/TariffOptionOrderBy.dto'
import { TariffOptionPaginatedResponseDTO } from './dto/TariffOptionPaginatedResponse.dto'
import { TariffOptionResponseDTO } from './dto/TariffOptionResponse.dto'
import { TariffOptionResponseFullDTO } from './dto/TariffOptionResponseFull.dto'
import { TariffOptionSearchFilterDTO } from './dto/TariffOptionSearchFilter.dto'
import { TariffOptionUpdateDTO } from './dto/TariffOptionUpdate.dto'

@Injectable()
export class TariffOptionService {
    constructor(private prismaService: PrismaService) {}

    async getById(id: string): Promise<TariffOptionResponseFullDTO | null> {
        return await this.prismaService.tariffOption.findUnique({
            where: { id },
            include: {
                availableHousingUnitTypes: {
                    include: { housingUnitType: true },
                },
                ageGroupPrices: {
                    include: { ageGroup: true },
                },
            },
        })
    }

    async create(
        companyId: string,
        rawData: TariffOptionDTO,
    ): Promise<TariffOptionResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.TariffOptionCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                availableHousingUnitTypes: {
                    createMany: { data: rawData.availableHousingUnitTypes },
                },
                ageGroupPrices: {
                    createMany: { data: rawData.ageGroupPrices },
                },
            })

        return await this.prismaService.tariffOption.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: TariffOptionUpdateDTO,
    ): Promise<TariffOptionResponseFullDTO> {
        const normalizedData =
            Prisma.validator<Prisma.TariffOptionUpdateInput>()({
                ...rawData,
                availableHousingUnitTypes:
                    rawData.availableHousingUnitTypes && {
                        deleteMany: {
                            tariffOptionId: id,
                            housingUnitTypeId: {
                                notIn: rawData.availableHousingUnitTypes.map(
                                    (housingUnitType) =>
                                        housingUnitType.housingUnitTypeId,
                                ),
                            },
                        },
                        upsert: rawData.availableHousingUnitTypes.map(
                            (housingUnitType) => ({
                                where: {
                                    tariff_option_housingunittype_unique: {
                                        tariffOptionId: id,
                                        housingUnitTypeId:
                                            housingUnitType.housingUnitTypeId,
                                    },
                                },
                                update: pick(housingUnitType, [
                                    'housingUnitTypeId',
                                ]),
                                create: pick(housingUnitType, [
                                    'housingUnitTypeId',
                                ]),
                            }),
                        ),
                    },
                ageGroupPrices: rawData.ageGroupPrices && {
                    deleteMany: {
                        id: id,
                        ageGroupId: {
                            notIn: rawData.ageGroupPrices.map(
                                (a) => a.ageGroupId,
                            ),
                        },
                    },
                    upsert: rawData.ageGroupPrices.map((a) => ({
                        where: {
                            tariff_option_age_groups: {
                                tariffOptionId: id,
                                ageGroupId: a.ageGroupId,
                            },
                        },
                        update: pick(a, ['price', 'ageGroupId']),
                        create: pick(a, ['price', 'ageGroupId']),
                    })),
                },
            })

        return await this.prismaService.tariffOption.update({
            where: { id },
            data: normalizedData,
            include: {
                availableHousingUnitTypes: {
                    include: { housingUnitType: true },
                },
                ageGroupPrices: {
                    include: { ageGroup: true },
                },
            },
        })
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        order?: TariffOptionOrderByDTO,
        filter?: TariffOptionSearchFilterDTO,
        query?: string,
    ): Promise<TariffOptionPaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [reservationOptions, totalReservationOptions] =
            await this.prismaService.tariffOption.findManyAndCount({
                where: {
                    ...this.buildSearchParams(query, filter),
                    companyId,
                },
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
                include: {
                    availableHousingUnitTypes: {
                        include: { housingUnitType: true },
                    },
                    ageGroupPrices: {
                        include: { ageGroup: true },
                    },
                },
            })

        return buildPaginatedResponse(
            reservationOptions,
            totalReservationOptions,
            pagination,
        )
    }

    private buildSearchParams(
        query?: string,
        filters?: TariffOptionSearchFilterDTO,
    ): Prisma.TariffOptionWhereInput {
        const data: Prisma.TariffOptionWhereInput = {}

        if (query) {
            data.name = { contains: query, mode: 'insensitive' }
        }

        if (filters?.published) {
            data.published = filters?.published
        }

        if (filters?.billingType) {
            data.billingType = { in: filters?.billingType }
        }

        return data
    }
}
