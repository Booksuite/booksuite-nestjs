import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

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

    create(rawData: ServiceCreateDTO): Promise<ServiceResponseDTO> {
        return this.prismaService.$transaction(async (db) => {
            let categoryId = rawData.categoryId as string
            if (rawData.category) {
                const newCategory = await db.serviceCategory.create({
                    data: rawData.category,
                })
                categoryId = newCategory.id
            }

            const omitted = omit(rawData, ['medias', 'categoryId', 'category'])

            const normalizedData = Prisma.validator(
                this.prismaService,
                'service',
                'create',
                'data',
            )({
                ...omitted,
                categoryId,
                medias: rawData.medias
                    ? { createMany: { data: rawData.medias } }
                    : undefined,
            })

            return db.service.create({
                data: normalizedData,
                include: { medias: { include: { media: true } } },
            })
        })
    }

    getById(id: string): Promise<ServiceResponseFullDTO | null> {
        return this.prismaService.service.findUnique({
            where: { id },
            include: { medias: { include: { media: true } } },
        })
    }

    update(
        id: string,
        rawData: ServiceCreateDTO,
    ): Promise<ServiceResponseDTO | null> {
        const omitted = omit(rawData, ['medias', 'categoryId', 'category'])
        const normalizedData = Prisma.validator(
            this.prismaService,
            'service',
            'update',
            'data',
        )(omitted)

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
