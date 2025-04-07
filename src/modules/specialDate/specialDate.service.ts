import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { pick } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { SpecialDateCreateDTO } from './dtos/SpecialDateCreate.dto'
import { SpecialDateOrderByDTO } from './dtos/SpecialDateOrderBy.dto'
import { SpecialDatePaginatedResponseDTO } from './dtos/SpecialDatePaginatedResponse.dto'
import { SpecialDateResponseDTO } from './dtos/SpecialDateResponse.dto'
import { SpecialDateResponseFullDTO } from './dtos/SpecialDateResponseFull.dto'
import { SpecialDateSearchFilterDTO } from './dtos/SpecialDateSearchFilter.dto'
import { SpecialDateUpdateDTO } from './dtos/SpecialDateUpdate.dto'
@Injectable()
export class SpecialDateService {
    constructor(private prismaService: PrismaService) {}

    create(
        companyId: string,
        rawData: SpecialDateCreateDTO,
    ): Promise<SpecialDateResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.SpecialDateCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                housingUnitTypePrices: {
                    createMany: {
                        data: rawData.housingUnitTypePrices,
                    },
                },
                includedServices: {
                    createMany: { data: rawData.includedServices },
                },
                medias: {
                    createMany: {
                        data: rawData.medias,
                    },
                },
            })

        return this.prismaService.specialDate.create({
            data: normalizedData,
        })
    }

    getById(id: string): Promise<SpecialDateResponseFullDTO | null> {
        return this.prismaService.specialDate.findUnique({
            where: { id },
            include: {
                housingUnitTypePrices: { include: { housingUnitType: true } },
                medias: { include: { media: true } },
                includedServices: { include: { service: true } },
            },
        })
    }

    update(
        id: string,
        rawData: SpecialDateUpdateDTO,
    ): Promise<SpecialDateResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.SpecialDateUpdateInput>()({
                ...rawData,
                housingUnitTypePrices: rawData.housingUnitTypePrices && {
                    deleteMany: {
                        specialDateId: id,
                        housingUnitTypeId: {
                            notIn:
                                rawData.housingUnitTypePrices.map(
                                    (housingUnitType) =>
                                        housingUnitType.housingUnitTypeId,
                                ) || [],
                        },
                    },
                    upsert: rawData.housingUnitTypePrices.map(
                        (housingUnitType) => ({
                            where: {
                                special_date_housing_unit_type_unique: {
                                    specialDateId: id,
                                    housingUnitTypeId:
                                        housingUnitType.housingUnitTypeId,
                                },
                            },
                            update: pick(housingUnitType, [
                                'housingUnitTypeId',
                                'baseWeekPrice',
                                'newWeekPrice',
                                'weekendBasePrice',
                                'weekendNewPrice',
                            ]),
                            create: pick(housingUnitType, [
                                'housingUnitTypeId',
                                'baseWeekPrice',
                                'newWeekPrice',
                                'weekendBasePrice',
                                'weekendNewPrice',
                            ]),
                        }),
                    ),
                },
                includedServices: rawData.housingUnitTypePrices && {
                    deleteMany: {
                        specialDateId: id,
                        serviceId: {
                            notIn:
                                rawData.includedServices?.map(
                                    (service) => service.serviceId,
                                ) || [],
                        },
                    },
                    upsert: rawData.includedServices?.map((service) => ({
                        where: {
                            special_date_service_unique: {
                                specialDateId: id,
                                serviceId: service.serviceId,
                            },
                        },
                        update: pick(service, ['serviceId']),
                        create: pick(service, ['serviceId']),
                    })),
                },
                medias: rawData.medias && {
                    deleteMany: {
                        specialDateId: id,
                        mediaId: {
                            notIn:
                                rawData.medias.map((media) => media.mediaId) ||
                                [],
                        },
                    },
                    upsert: rawData.medias.map((medias) => ({
                        where: {
                            special_date_media_unique: {
                                specialDateId: id,
                                mediaId: medias.mediaId,
                            },
                        },
                        update: pick(medias, ['mediaId', 'order']),
                        create: pick(medias, ['mediaId', 'order']),
                    })),
                },
            })

        return this.prismaService.specialDate.update({
            where: { id },
            data: normalizedData,
        })
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        order?: SpecialDateOrderByDTO,
        filter?: SpecialDateSearchFilterDTO,
        query?: string,
    ): Promise<SpecialDatePaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)
        const [specialDate, totalSpecialDates] =
            await this.prismaService.specialDate.findManyAndCount({
                where: {
                    ...this.buildSearchParams(query, filter),
                    companyId,
                },
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
                include: {
                    housingUnitTypePrices: {
                        include: { housingUnitType: true },
                    },
                    includedServices: { include: { service: true } },
                    medias: {
                        orderBy: { order: 'asc' } as any,
                        include: { media: true },
                    },
                },
            })

        return buildPaginatedResponse(
            specialDate,
            totalSpecialDates,
            pagination,
        )
    }

    private buildSearchParams(
        query?: string,
        filters?: SpecialDateSearchFilterDTO,
    ): Prisma.SpecialDateWhereInput {
        const data: Prisma.SpecialDateWhereInput = {}

        if (query) {
            data.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                {
                    generalDescription: {
                        contains: query,
                        mode: 'insensitive',
                    },
                },
            ]
        }

        if (filters) {
            data.published = filters?.published
            data.startDate = {
                gte: filters.startDate?.start,
                lte: filters.startDate?.end,
            }
            data.endDate = {
                gte: filters.endDate?.start,
                lte: filters.endDate?.end,
            }
        }

        return data
    }
}
