import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { pick } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { RateOptionDTO } from './dto/RateOption.dto'
import { RateOptionOrderByDTO } from './dto/RateOptionOrderBy.dto'
import { RateOptionPaginatedResponseDTO } from './dto/RateOptionPaginatedResponse.dto'
import { RateOptionResponseDTO } from './dto/RateOptionResponse.dto'
import { RateOptionResponseFullDTO } from './dto/RateOptionResponseFull.dto'
import { RateOptionSearchFilterDTO } from './dto/RateOptionSearchFilter.dto'
import { RateOptionUpdateDTO } from './dto/RateOptionUpdate.dto'

@Injectable()
export class RateOptionService {
    constructor(private prismaService: PrismaService) {}

    async getById(id: string): Promise<RateOptionResponseFullDTO | null> {
        return await this.prismaService.rateOption.findUnique({
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
        rawData: RateOptionDTO,
    ): Promise<RateOptionResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.RateOptionCreateInput>()(
            {
                ...rawData,
                company: { connect: { id: companyId } },
                availableHousingUnitTypes: {
                    createMany: { data: rawData.availableHousingUnitTypes },
                },
                ageGroupPrices: {
                    createMany: { data: rawData.ageGroupPrices },
                },
            },
        )

        return await this.prismaService.rateOption.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: RateOptionUpdateDTO,
    ): Promise<RateOptionResponseFullDTO> {
        const normalizedData = Prisma.validator<Prisma.RateOptionUpdateInput>()(
            {
                ...rawData,
                availableHousingUnitTypes:
                    rawData.availableHousingUnitTypes && {
                        deleteMany: {
                            id: id,
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
                                    rate_option_housingunittype_unique: {
                                        rateOptionId: id,
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
                            rate_option_age_groups: {
                                rateOptionId: id,
                                ageGroupId: a.ageGroupId,
                            },
                        },
                        update: pick(a, ['price', 'ageGroupId']),
                        create: pick(a, ['price', 'ageGroupId']),
                    })),
                },
            },
        )

        return await this.prismaService.rateOption.update({
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
        order?: RateOptionOrderByDTO,
        filter?: RateOptionSearchFilterDTO,
        query?: string,
    ): Promise<RateOptionPaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [reservationOptions, totalReservationOptions] =
            await this.prismaService.rateOption.findManyAndCount({
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
        filters?: RateOptionSearchFilterDTO,
    ): Prisma.RateOptionWhereInput {
        const data: Prisma.RateOptionWhereInput = {}

        if (query) {
            data.name = { contains: query, mode: 'insensitive' }
        }

        if (filters?.published) {
            data.published = filters?.published
        }

        if (filters?.billingType) {
            data.billingType = { in: filters?.billingType }
        }

        if (filters?.housingUnitTypeIds) {
            data.availableHousingUnitTypes = {
                some: {
                    housingUnitTypeId: { in: filters?.housingUnitTypeIds },
                },
            }
        }

        return data
    }
}
