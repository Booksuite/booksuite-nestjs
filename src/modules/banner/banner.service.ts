import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerCreateDTO } from './dto/BannerCreate.dto'
import { BannerOrderByDTO } from './dto/BannerOrderBy.dto'
import { BannerResponseDTO } from './dto/BannerResponse.dto'
import { BannerResponseFullDTO } from './dto/BannerResponseFull.dto'
import { BannerResponsePaginatedDTO } from './dto/BannerResponsePaginated.dto'
import { BannerSearchFilterDTO } from './dto/BannerSearchFilter.dto'

@Injectable()
export class BannerService {
    constructor(private prismaService: PrismaService) {}

    create(
        companyId: string,
        rawData: BannerCreateDTO,
    ): Promise<BannerResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.BannerCreateInput>()({
            ...rawData,
            company: { connect: { id: companyId } },
            medias: { createMany: { data: rawData.medias } },
        })

        return this.prismaService.banner.create({
            data: normalizedData,
        })
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        filter?: BannerSearchFilterDTO,
        order?: BannerOrderByDTO,
        query?: string,
    ): Promise<BannerResponsePaginatedDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [banners, total] =
            await this.prismaService.banner.findManyAndCount({
                where: {
                    ...this.buildSearchParams(query, filter),
                    companyId: companyId,
                },
                ...paginationParams,
                orderBy: order ? { [order.orderBy]: order.order } : undefined,
            })

        return buildPaginatedResponse(banners, total, pagination)
    }

    getById(id: string): Promise<BannerResponseFullDTO | null> {
        return this.prismaService.banner.findUnique({
            where: { id },
            include: { medias: { include: { media: true } } },
        })
    }

    update(id: string, rawData: BannerCreateDTO): Promise<BannerResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.BannerUpdateInput>()({
            ...rawData,
            medias: {
                deleteMany: {
                    bannerId: id,
                    mediaId: {
                        notIn: rawData.medias.map((media) => media.mediaId),
                    },
                },
                createMany: { data: rawData.medias },
            },
        })

        return this.prismaService.banner.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.banner.delete({
            where: { id },
        })
    }

    private buildSearchParams(
        query?: string,
        filters?: BannerSearchFilterDTO,
    ): Prisma.BannerWhereInput {
        const data: Prisma.BannerWhereInput = {}

        if (query) {
            data.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { title: { contains: query, mode: 'insensitive' } },
            ]
        }

        if (filters) data.position = filters.position

        return data
    }
}
