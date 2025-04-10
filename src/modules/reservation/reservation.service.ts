import { Injectable } from '@nestjs/common'
import { Prisma, ReservationSaleChannel } from '@prisma/client'
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
            companyId,
            reservationCode,
            saleChannel:
                rawData.saleChannel || ReservationSaleChannel.BOOKSUITE,
            services: {
                createMany: { data: rawData.services },
            },
            children: {
                createMany: { data: rawData.children },
            },
            reservationOption: {
                createMany: { data: rawData.reservationOption },
            },
        })

        return this.prismaService.reservation.create({
            data: normalizedData,
        })
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
                where: { ...this.buildSearchParams(query, filter), companyId },
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
                ...paginationParams,
            })

        return buildPaginatedResponse(reservations, total, pagination)
    }

    private buildSearchParams(
        query?: string,
        filter?: ReservationSearchFilterDTO,
    ) {
        const data: Prisma.ReservationFindManyArgs['where'] = {}

        if (query) {
            data.OR = [
                { reservationCode: { contains: query, mode: 'insensitive' } },

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
            ]
        }

        if (filter) {
            data.saleChannel = filter.saleChannel
            data.sellerUserId = filter.sellerUserId
            data.userId = filter.userId
            data.status = filter.status

            if (filter.startDate) {
                data.startDate = {
                    gte: filter.startDate?.start,
                    lte: filter.startDate?.end,
                }
            }
            if (filter.endDate) {
                data.endDate = {
                    gte: filter.endDate?.start,
                    lte: filter.endDate?.end,
                }
            }
            if (filter.createdDate) {
                data.createdAt = {
                    gte: filter.createdDate?.start,
                    lte: filter.createdDate?.end,
                }
            }
        }

        return data
    }

    async getById(id: string): Promise<ReservationResponseFullDTO | null> {
        return this.prismaService.reservation.findUnique({
            where: { id },
            include: {
                housingUnit: true,
                services: { include: { service: true } },
                sellerUser: true,
                guestUser: true,
                children: { include: { ageGroup: true } },
                reservationOption: { include: { reservationOption: true } },
            },
        })
    }

    update(
        id: string,
        rawData: ReservationUpdateDTO,
    ): Promise<ReservationResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationUpdateInput>()({
                ...rawData,
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
                            'qtd',
                            'totalPrice',
                        ]),
                        create: pick(service, [
                            'serviceId',
                            'qtd',
                            'totalPrice',
                        ]),
                    })),
                },
                children: rawData.children && {
                    deleteMany: {
                        reservationId: id,
                        ageGroupId: {
                            notIn:
                                rawData.children?.map((a) => a.ageGroupId) ||
                                [],
                        },
                    },

                    upsert: rawData.children?.map((a) => ({
                        where: {
                            reservation_age_groups_unique: {
                                reservationId: id,
                                ageGroupId: a.ageGroupId,
                            },
                        },
                        update: pick(a, ['ageGroupId', 'children']),
                        create: pick(a, ['ageGroupId', 'children']),
                    })),
                },
                reservationOption: rawData.reservationOption && {
                    deleteMany: {
                        reservationId: id,
                        reservationOptionId: {
                            notIn:
                                rawData.reservationOption?.map(
                                    (r) => r.reservationOptionId,
                                ) || [],
                        },
                    },

                    upsert: rawData.reservationOption?.map((r) => ({
                        where: {
                            reservation_reservation_option_unique: {
                                reservationId: id,
                                reservationOptionId: r.reservationOptionId,
                            },
                        },
                        update: pick(r, ['reservationOptionId']),
                        create: pick(r, ['reservationOptionId']),
                    })),
                },
            })

        return this.prismaService.reservation.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.reservation.delete({ where: { id } })
    }
}
