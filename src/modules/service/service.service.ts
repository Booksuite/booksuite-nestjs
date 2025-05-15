import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit, pick } from 'radash'

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
import { ServiceUpdateDTO } from './dtos/ServiceUpdate.dto'

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
            ...omit(rawData, ['coverMediaId']),
            company: { connect: { id: companyId } },
            availableHousingUnitTypes: {
                createMany: { data: rawData.availableHousingUnitTypes },
            },
            medias: { createMany: { data: rawData.medias } },
            coverMedia: rawData.coverMediaId
                ? { connect: { id: rawData.coverMediaId } }
                : undefined,
        })

        return this.prismaService.service.create({ data: normalizedData })
    }

    getById(id: string): Promise<ServiceResponseFullDTO | null> {
        return this.prismaService.service.findUnique({
            where: { id },
            include: {
                medias: { include: { media: true }, orderBy: { order: 'asc' } },
                availableHousingUnitTypes: {
                    include: { housingUnitType: true },
                },
            },
        })
    }

    update(id: string, rawData: ServiceUpdateDTO): Promise<ServiceResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.ServiceUpdateInput>()({
            ...rawData,
            availableHousingUnitTypes: rawData.availableHousingUnitTypes && {
                deleteMany: {
                    serviceId: id,
                    housingUnitTypeId: {
                        notIn:
                            rawData.availableHousingUnitTypes.map(
                                (housingUnitType) =>
                                    housingUnitType.housingUnitTypeId,
                            ) || [],
                    },
                },
                upsert: rawData.availableHousingUnitTypes.map(
                    (housingUnitType) => ({
                        where: {
                            service_housingunittype_unique: {
                                serviceId: id,
                                housingUnitTypeId:
                                    housingUnitType.housingUnitTypeId,
                            },
                        },
                        update: pick(housingUnitType, ['housingUnitTypeId']),
                        create: pick(housingUnitType, ['housingUnitTypeId']),
                    }),
                ),
            },
            medias: rawData.medias && {
                deleteMany: {
                    serviceId: id,
                    mediaId: {
                        notIn:
                            rawData.medias.map((media) => media.mediaId) || [],
                    },
                },
                upsert: rawData.medias.map((media) => ({
                    where: {
                        service_media_unique: {
                            serviceId: id,
                            mediaId: media.mediaId,
                        },
                    },
                    update: pick(media, ['mediaId', 'order']),
                    create: pick(media, ['mediaId', 'order']),
                })),
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
                    availableHousingUnitTypes: {
                        include: { housingUnitType: true },
                    },
                    medias: {
                        orderBy: { order: 'asc' } as any,
                        include: { media: true },
                    },
                },
            })

        return buildPaginatedResponse(services, totalServices, pagination)
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

        if (filters?.housingUnitTypeIds) {
            data.availableHousingUnitTypes = {
                some: {
                    housingUnitTypeId: { in: filters.housingUnitTypeIds },
                },
            }
        }

        return data
    }
}
