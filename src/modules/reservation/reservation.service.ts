import { Injectable } from '@nestjs/common'
import { Prisma, ReservationSaleChannel } from '@prisma/client'
import dayjs from 'dayjs'
import { pick } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { RESERVATION_CODE_CHANNEL_MAPPING } from './constants'
import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationOrderByDTO } from './dto/ReservationOrderBy.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'
import { ReservationResponsePaginatedDTO } from './dto/ReservationResponsePaginated.dto'
import { ReservationSearchFilterDTO } from './dto/ReservationSearchFilter.dto'
import { ReservationUpdateDTO } from './dto/ReservationUpdate.dto'

@Injectable()
export class ReservationService {
    constructor(private prismaService: PrismaService) {}

    async create(
        companyId: string,
        rawData: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO> {
        const reservationCode = await this.buildReservationCode(
            companyId,
            rawData.saleChannel,
        )

        const normalizedData = Prisma.validator<
            Prisma.ReservationCreateArgs['data']
        >()({
            ...rawData,
            startDate: dayjs.utc(rawData.startDate).toDate(),
            endDate: dayjs.utc(rawData.endDate).toDate(),
            companyId,
            reservationCode,
            saleChannel:
                rawData.saleChannel || ReservationSaleChannel.BOOKSUITE,
            services: {
                createMany: { data: rawData.services },
            },
            ageGroups: {
                createMany: { data: rawData.ageGroups },
            },
        })

        const reservation = await this.prismaService.reservation
            .create({
                data: normalizedData,
                include: {
                    guestUser: true,
                    housingUnit: true,
                },
            })
            .then((reservation) => {
                return {
                    ...reservation,
                    preOrderExpiraiton: reservation.preOrderExpiraiton
                        ? dayjs
                              .utc(reservation.preOrderExpiraiton)
                              .format('YYYY-MM-DD')
                        : null,
                    startDate: dayjs
                        .utc(reservation.startDate)
                        .format('YYYY-MM-DD'),
                    endDate: dayjs
                        .utc(reservation.endDate)
                        .format('YYYY-MM-DD'),
                }
            })

        return reservation
    }

    private async buildReservationCode(
        companyId: string,
        saleChannel?: ReservationSaleChannel,
    ) {
        const channel = saleChannel || ReservationSaleChannel.BOOKSUITE
        const sequential = await this.prismaService.reservation.count({
            where: {
                companyId,
            },
        })

        return `${RESERVATION_CODE_CHANNEL_MAPPING[channel]}${sequential.toString().padStart(6, '0')}`
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        filter?: ReservationSearchFilterDTO,
        order?: ReservationOrderByDTO,
        query?: string,
    ): Promise<ReservationResponsePaginatedDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [reservations, total] =
            await this.prismaService.reservation.findManyAndCount({
                include: {
                    guestUser: true,
                    housingUnit: true,
                },
                where: {
                    AND: [
                        ...this.buildSearchParams(query, filter),
                        { companyId },
                    ],
                },
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
                ...paginationParams,
            })

        const formattedReservations = reservations.map((reservation) => {
            return {
                ...reservation,
                preOrderExpiraiton: reservation.preOrderExpiraiton
                    ? dayjs
                          .utc(reservation.preOrderExpiraiton)
                          .format('YYYY-MM-DD')
                    : null,
                startDate: dayjs
                    .utc(reservation.startDate)
                    .format('YYYY-MM-DD'),
                endDate: dayjs.utc(reservation.endDate).format('YYYY-MM-DD'),
            }
        })

        return buildPaginatedResponse(formattedReservations, total, pagination)
    }

    private buildSearchParams(
        query?: string,
        filter?: ReservationSearchFilterDTO,
    ) {
        const FILTER: Prisma.ReservationWhereInput[] = []

        if (query) {
            FILTER.push({
                OR: [
                    {
                        reservationCode: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        housingUnit: {
                            housingUnitType: {
                                name: { contains: query, mode: 'insensitive' },
                            },
                        },
                    },
                    {
                        housingUnit: {
                            name: { contains: query, mode: 'insensitive' },
                        },
                    },
                    {
                        guestUser: {
                            OR: [
                                {
                                    firstName: {
                                        contains: query,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    lastName: {
                                        contains: query,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    email: {
                                        contains: query,
                                        mode: 'insensitive',
                                    },
                                },
                            ],
                        },
                    },
                ],
            })
        }

        if (filter) {
            FILTER.push({ saleChannel: filter.saleChannel })
            FILTER.push({ sellerUserId: filter.sellerUserId })
            FILTER.push({ guestUserId: filter.guestUserId })
            FILTER.push({ status: { in: filter.status } })

            if (filter.dateRange) {
                const formattedDateRangeStart = dayjs
                    .utc(filter.dateRange.start)
                    .toDate()
                const formattedDateRangeEnd = dayjs
                    .utc(filter.dateRange.end)
                    .toDate()

                FILTER.push({
                    OR: [
                        {
                            startDate: {
                                lte: formattedDateRangeStart,
                            },
                            endDate: {
                                gte: formattedDateRangeStart,
                            },
                        },
                        {
                            startDate: {
                                lte: formattedDateRangeEnd,
                            },
                            endDate: {
                                gte: formattedDateRangeEnd,
                            },
                        },
                        {
                            startDate: {
                                gte: formattedDateRangeStart,
                            },
                            endDate: {
                                lte: formattedDateRangeEnd,
                            },
                        },
                    ],
                })
            }

            if (filter.createdDate) {
                FILTER.push({
                    createdAt: {
                        gte: filter.createdDate?.start,
                        lte: filter.createdDate?.end,
                    },
                })
            }
        }

        return FILTER
    }

    async getById(id: string): Promise<ReservationResponseFullDTO | null> {
        const reservation = await this.prismaService.reservation.findUnique({
            where: { id },
            include: {
                housingUnit: true,
                services: {
                    include: {
                        service: {
                            include: {
                                medias: { include: { media: true } },
                                availableHousingUnitTypes: {
                                    include: { housingUnitType: true },
                                },
                            },
                        },
                    },
                },
                sellerUser: true,
                guestUser: true,
                ageGroups: { include: { ageGroup: true } },
                rateOption: {
                    include: {
                        ageGroupPrices: { include: { ageGroup: true } },
                    },
                },
                housingUnitType: true,
            },
        })
        if (!reservation) return null

        return {
            ...reservation,
            preOrderExpiraiton: reservation.preOrderExpiraiton
                ? dayjs.utc(reservation.preOrderExpiraiton).format('YYYY-MM-DD')
                : null,
            startDate: dayjs.utc(reservation.startDate).format('YYYY-MM-DD'),
            endDate: dayjs.utc(reservation.endDate).format('YYYY-MM-DD'),
        }
    }

    async update(
        id: string,
        rawData: ReservationUpdateDTO,
    ): Promise<ReservationResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationUpdateInput>()({
                ...rawData,
                startDate: rawData.startDate
                    ? dayjs.utc(rawData.startDate).toDate()
                    : undefined,
                endDate: rawData.endDate
                    ? dayjs.utc(rawData.endDate).toDate()
                    : undefined,
                services: rawData.services && {
                    deleteMany: {
                        reservationId: id,
                        serviceId: {
                            notIn:
                                rawData.services?.map(
                                    (service) => service.serviceId,
                                ) || [],
                        },
                    },
                    upsert: rawData.services?.map((service) => ({
                        where: {
                            reservation_service_unique: {
                                reservationId: id,
                                serviceId: service.serviceId,
                            },
                        },
                        update: pick(service, [
                            'serviceId',
                            'quantity',
                            'totalPrice',
                        ]),
                        create: pick(service, [
                            'serviceId',
                            'quantity',
                            'totalPrice',
                        ]),
                    })),
                },
                ageGroups: rawData.ageGroups && {
                    deleteMany: {
                        reservationId: id,
                        ageGroupId: {
                            notIn: rawData.ageGroups.map((a) => a.ageGroupId),
                        },
                    },

                    upsert: rawData.ageGroups.map((a) => ({
                        where: {
                            reservation_age_groups_unique: {
                                reservationId: id,
                                ageGroupId: a.ageGroupId,
                            },
                        },
                        update: pick(a, ['ageGroupId', 'quantity']),
                        create: pick(a, ['ageGroupId', 'quantity']),
                    })),
                },
            })

        const reservation = await this.prismaService.reservation.update({
            where: { id },
            data: normalizedData,
            include: {
                guestUser: true,
                housingUnit: true,
            },
        })

        return {
            ...reservation,
            preOrderExpiraiton: reservation.preOrderExpiraiton
                ? dayjs.utc(reservation.preOrderExpiraiton).format('YYYY-MM-DD')
                : null,
            startDate: dayjs.utc(reservation.startDate).format('YYYY-MM-DD'),
            endDate: dayjs.utc(reservation.endDate).format('YYYY-MM-DD'),
        }
    }

    delete(id: string) {
        return this.prismaService.reservation.delete({ where: { id } })
    }
}
