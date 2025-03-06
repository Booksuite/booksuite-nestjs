import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PaginationQuery } from '@/common/types/pagination'
import { buildPaginatedResponse } from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'
import { ServicePaginatedResponseDTO } from './dtos/ServicePaginatedResponse.dto'
import { ServiceResponseDTO } from './dtos/ServiceResponse.dto'
import { ServiceResponseFullDTO } from './dtos/ServiceResponseFull.dto'
import { ServiceSearchQueryDTO } from './dtos/ServiceSearchQuery.dto'

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
            category: {
                connectOrCreate: {
                    where: { id: rawData.category.id },
                    create: rawData.category,
                },
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
                category: true,
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
            category: {
                connectOrCreate: {
                    where: { id: rawData.category.id },
                    create: rawData.category,
                },
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

    async searchServices(
        companyId: string,
        pagination: PaginationQuery,
        queryParams: ServiceSearchQueryDTO,
    ): Promise<ServicePaginatedResponseDTO> {
        const [services, totalServices] =
            await this.prismaService.service.findManyAndCount({
                where: {
                    name: { contains: queryParams.name, mode: 'insensitive' },
                    price: { lte: queryParams.price, gte: 0 },
                    adults: queryParams.adults,
                    minDaily: queryParams.minDaily,
                    minNotice: queryParams.minNotice,
                    seasonStart: { gte: queryParams.seasonStart },
                    seasonEnd: { lte: queryParams.seasonEnd },
                },
            })

        return buildPaginatedResponse(services, totalServices, pagination)
    }
}
