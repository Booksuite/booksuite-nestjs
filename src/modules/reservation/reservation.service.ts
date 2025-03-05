import { Injectable } from '@nestjs/common'
import { Prisma, ReservationSaleChannel } from '@prisma/client'
import { omit } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationCreateDTO } from './dto/ReservationCreate.dto'
import { ReservationOrderByDTO } from './dto/ReservationOrderBy.dto'
import { ReservationResponseDTO } from './dto/ReservationResponse.dto'
import { ReservationResponseFullDTO } from './dto/ReservationResponseFull.dto'
import { ReservationResponsePaginatedDTO } from './dto/ReservationResponsePaginated.dto'

@Injectable()
export class ReservationService {
    constructor(private prismaService: PrismaService) {}

    create(
        companyId: string,
        rawData: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO> {
        const normalizedData = Prisma.validator<
            Prisma.ReservationCreateArgs['data']
        >()({
            ...rawData,
            companyId,
            reservationCode: `${rawData.saleChannel}-${rawData.startDate.getFullYear()}`,
            saleChannel:
                rawData.saleChannel || ReservationSaleChannel.BOOKSUITE,
            services: {
                createMany: { data: rawData.services },
            },
        })

        return this.prismaService.reservation.create({
            data: normalizedData,
        })
    }

    async list(
        companyId: string,
        pagination: PaginationQuery,
        order: ReservationOrderByDTO,
    ): Promise<ReservationResponsePaginatedDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [reservations, total] =
            await this.prismaService.reservation.findManyAndCount({
                where: { companyId },
                ...paginationParams,
                orderBy: { [order.orderBy]: order.order },
            })

        return buildPaginatedResponse(reservations, total, pagination)
    }

    async getById(id: string): Promise<ReservationResponseFullDTO | null> {
        return this.prismaService.reservation.findUnique({
            where: { id },
            include: {
                housingUnit: true,
                services: { include: { service: true } },
                sellerUser: true,
                user: true,
            },
        })
    }

    update(
        id: string,
        rawData: ReservationCreateDTO,
    ): Promise<ReservationResponseDTO | null> {
        const normalizedData = Prisma.validator<
            Prisma.ReservationUpdateArgs['data']
        >()({
            ...omit(rawData, ['saleChannel', 'userId']),
            services: {
                deleteMany: {
                    reservationId: id,
                    serviceId: {
                        notIn: rawData.services.map(
                            (service) => service.serviceId,
                        ),
                    },
                },
                createMany: { data: rawData.services },
            },
        })

        return this.prismaService.reservation.update({
            where: { id: id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.reservation.delete({ where: { id } })
    }
}
