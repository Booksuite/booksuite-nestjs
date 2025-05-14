import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
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
                visibilityStartDate: dayjs(
                    rawData.visibilityStartDate,
                ).toDate(),
                startDate: dayjs(rawData.startDate).toDate(),
                endDate: dayjs(rawData.endDate).toDate(),
                company: { connect: { id: companyId } },
                housingUnitTypePrices: {
                    createMany: {
                        data: rawData.housingUnitTypePrices,
                    },
                },
                medias: {
                    createMany: {
                        data: rawData.medias,
                    },
                },
            })

        return this.prismaService.specialDate
            .create({
                data: normalizedData,
            })
            .then((specialDate) => {
                return {
                    ...specialDate,
                    visibilityStartDate: dayjs(
                        specialDate.visibilityStartDate,
                    ).format('YYYY-MM-DD'),
                    startDate: dayjs(specialDate.startDate)
                        .utc()
                        .format('YYYY-MM-DD'),
                    endDate: dayjs(specialDate.endDate)
                        .utc()
                        .format('YYYY-MM-DD'),
                }
            })
    }

    getById(id: string): Promise<SpecialDateResponseFullDTO | null> {
        return this.prismaService.specialDate
            .findUnique({
                where: { id },
                include: {
                    housingUnitTypePrices: {
                        include: { housingUnitType: true },
                    },
                    medias: { include: { media: true } },
                },
            })
            .then((specialDate) => {
                if (!specialDate) return null

                return {
                    ...specialDate,
                    visibilityStartDate: dayjs(specialDate.visibilityStartDate)
                        .utc()
                        .format('YYYY-MM-DD'),
                    startDate: dayjs(specialDate.startDate)
                        .utc()
                        .format('YYYY-MM-DD'),
                    endDate: dayjs(specialDate.endDate)
                        .utc()
                        .format('YYYY-MM-DD'),
                }
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
                                'finalWeekPrice',
                                'baseWeekendPrice',
                                'finalWeekendPrice',
                            ]),
                            create: pick(housingUnitType, [
                                'housingUnitTypeId',
                                'baseWeekPrice',
                                'finalWeekPrice',
                                'baseWeekendPrice',
                                'finalWeekendPrice',
                            ]),
                        }),
                    ),
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

        return this.prismaService.specialDate
            .update({
                where: { id },
                data: normalizedData,
            })
            .then((specialDate) => {
                return {
                    ...specialDate,
                    visibilityStartDate: dayjs(
                        specialDate.visibilityStartDate,
                    ).format('YYYY-MM-DD'),
                    startDate: dayjs(specialDate.startDate).format(
                        'YYYY-MM-DD',
                    ),
                    endDate: dayjs(specialDate.endDate).format('YYYY-MM-DD'),
                }
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
        const [specialDates, totalSpecialDates] =
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
                    medias: {
                        orderBy: { order: 'asc' } as any,
                        include: { media: true },
                    },
                },
            })

        return buildPaginatedResponse(
            specialDates.map((specialDate) => ({
                ...specialDate,
                visibilityStartDate: dayjs(
                    specialDate.visibilityStartDate,
                ).format('YYYY-MM-DD'),
                startDate: dayjs(specialDate.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(specialDate.endDate).format('YYYY-MM-DD'),
            })),
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
