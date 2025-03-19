import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'
import { ServiceOrderByDTO } from './dtos/ServiceOrderBy.dto'
import { ServicePaginatedResponseDTO } from './dtos/ServicePaginatedResponse.dto'
import { ServiceResponseDTO } from './dtos/ServiceResponse.dto'
import { ServiceResponseFullDTO } from './dtos/ServiceResponseFull.dto'
import { ServiceSearchFilterDTO } from './dtos/ServiceSearchFilter.dto'

@Injectable()
export class ServiceService {
    constructor(private prismaService: PrismaService) {}

    create(
        companyId: string,
        rawData: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO> {
        const normalizedData = Prisma.validator<
            Prisma.ServiceCreateArgs['data']
        >()({
            ...rawData,
            company: { connect: { id: companyId } },
            housingUnitType: {
                createMany: { data: rawData.housingUnitType },
            },
            medias: { createMany: { data: rawData.medias } },
        })

        return this.prismaService.service.create({ data: normalizedData })
    }

    getById(id: string): Promise<ServiceResponseFullDTO | null> {
        return this.prismaService.service.findUnique({
            where: { id },
            include: {
                medias: { include: { media: true } },
                housingUnitType: {
                    include: { housingUnitType: true },
                },
            },
        })
    }

    update(
        id: string,
        rawData: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO | null> {
        const normalizedData = Prisma.validator<
            Prisma.ServiceUpdateArgs['data']
        >()({
            ...rawData,
            housingUnitType: {
                deleteMany: {
                    serviceId: id,
                    housingUnitTypeId: {
                        notIn: rawData.housingUnitType?.map(
                            (housingUnitType) =>
                                housingUnitType.housingUnitTypeId,
                        ),
                    },
                },
                createMany: { data: rawData.housingUnitType },
            },
            medias: {
                deleteMany: {
                    serviceId: id,
                    mediaId: {
                        notIn: rawData.medias.map((media) => media.mediaId),
                    },
                },
                createMany: { data: rawData.medias },
            },
        })

        return this.prismaService.service.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.service.delete({ where: { id } })
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        order?: ServiceOrderByDTO,
        filter?: ServiceSearchFilterDTO,
        query?: string,
    ): Promise<ServicePaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [services, totalServices] =
            await this.prismaService.service.findManyAndCount({
                where: {
                    ...this.buildSearchParams(query, filter),
                    companyId,
                },
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
                include: {
                    housingUnitType: true,
                    medias: { include: { media: true } },
                },
            })

        return buildPaginatedResponse(
            services as unknown as ServiceResponseFullDTO[],
            totalServices,
            pagination,
        )
    }

    private buildSearchParams(
        query?: string,
        filters?: ServiceSearchFilterDTO,
    ): Prisma.ServiceWhereInput {
        const data: Prisma.ServiceWhereInput = {}

        if (query) {
            data.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { included: { contains: query, mode: 'insensitive' } },
                { notes: { contains: query, mode: 'insensitive' } },
            ]
        }

        if (filters) data.published = filters?.published

        return data
    }
}
