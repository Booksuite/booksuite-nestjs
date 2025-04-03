import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { pick } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationOptionDTO } from './dto/ReservationOption.dto'
import { ReservationOptionOrderByDTO } from './dto/ReservationOptionOrderBy.dto'
import { ReservationOptionPaginatedResponseDTO } from './dto/ReservationOptionPaginatedResponse.dto'
import { ReservationOptionResponseDTO } from './dto/ReservationOptionResponse.dto'
import { ReservationOptionResponseFullDTO } from './dto/ReservationOptionResponseFull.dto'
import { ReservationOptionSearchFilterDTO } from './dto/ReservationOptionSearchFilter.dto'

@Injectable()
export class ReservationOptionService {
    constructor(private prismaService: PrismaService) {}

    async getById(
        id: string,
    ): Promise<ReservationOptionResponseFullDTO | null> {
        return await this.prismaService.reservationOption.findUnique({
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
        rawData: ReservationOptionDTO,
    ): Promise<ReservationOptionResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationOptionCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                availableHousingUnitTypes: {
                    createMany: { data: rawData.availableHousingUnitTypes },
                },
                ageGroupPrices: {
                    createMany: { data: rawData.ageGroupPrices },
                },
            })

        return await this.prismaService.reservationOption.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: ReservationOptionDTO,
    ): Promise<ReservationOptionResponseFullDTO> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationOptionUpdateInput>()({
                ...rawData,
                availableHousingUnitTypes:
                    rawData.availableHousingUnitTypes && {
                        deleteMany: {
                            reservationOptionId: id,
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
                                    reservation_option_housingunittype_unique: {
                                        reservationOptionId: id,
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
                            reservation_option_age_groups: {
                                reservationOptionId: id,
                                ageGroupId: a.ageGroupId,
                            },
                        },
                        update: pick(a, ['price', 'ageGroupId']),
                        create: pick(a, ['price', 'ageGroupId']),
                    })),
                },
            })

        return await this.prismaService.reservationOption.update({
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
        order?: ReservationOptionOrderByDTO,
        filter?: ReservationOptionSearchFilterDTO,
        query?: string,
    ): Promise<ReservationOptionPaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [reservationOptions, totalReservationOptions] =
            await this.prismaService.reservationOption.findManyAndCount({
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
        filters?: ReservationOptionSearchFilterDTO,
    ): Prisma.ReservationOptionWhereInput {
        const data: Prisma.ReservationOptionWhereInput = {}

        if (query) {
            data.OR = [{ name: { contains: query, mode: 'insensitive' } }]
        }

        if (filters) {
            data.published = filters?.published
            data.billingType = filters.billingType
        }

        return data
    }
}
