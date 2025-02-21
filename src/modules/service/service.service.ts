import { Injectable } from '@nestjs/common'
import { Prisma, Service } from '@prisma/client'
import { omit } from 'radash'

import { PaginatedResponse, PaginationQuery } from '@/common/types/pagination'
import { buildPaginatedResponse } from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'

@Injectable()
export class ServiceService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: ServiceCreateDTO) {
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

            return db.service.create({ data: normalizedData })
        })
    }

    getById(id: string) {
        return this.prismaService.service.findUnique({ where: { id } })
    }

    update(id: string, rawData: ServiceCreateDTO) {
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
    ): Promise<PaginatedResponse<Service>> {
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
