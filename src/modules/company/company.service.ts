import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit, pick } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyCreateDTO } from './dto/CompanyCreate.dto'
import { CompanyOrderByDTO } from './dto/CompanyOrderBy.dto'
import { CompanyResponseDTO } from './dto/CompanyResponse.dto'
import { CompanyResponseFullDTO } from './dto/CompanyResponseFull.dto'
import { CompanyResponsePaginatedDTO } from './dto/CompanyResponsePaginated.dto'
import { CompanySearchFilterDTO } from './dto/CompanySearchFilter.dto'
import { CompanyUpdateDTO } from './dto/CompanyUpdate.dto'

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService) {}

    async create(rawData: CompanyCreateDTO): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyCreateInput>()({
            ...omit(rawData, ['bannerImageId', 'companyMedias']),
            bannerImage: {
                connect: { id: rawData.bannerImageId },
            },
            facilities: rawData.facilities
                ? {
                      createMany: { data: rawData.facilities },
                  }
                : undefined,
            contacts: rawData.contacts || undefined,
            companyMedias: rawData.companyMedias
                ? {
                      createMany: { data: rawData.companyMedias },
                  }
                : undefined,
        })

        const result = await this.prismaService.company.create({
            data: normalizedData,
            include: { bannerImage: true },
        })

        return result
    }

    async getById(id: string): Promise<CompanyResponseFullDTO | null> {
        const result = await this.prismaService.company.findUnique({
            where: { id },
            include: {
                facilities: {
                    include: { facility: true },
                    orderBy: { order: 'asc' },
                },
                bannerImage: true,
                companyMedias: {
                    include: { media: true },
                    orderBy: { order: 'asc' },
                },
            },
        })

        if (!result) return null

        return result
    }

    async search(
        pagination: PaginationQuery,
        order?: CompanyOrderByDTO,
        query?: string,
        filters?: CompanySearchFilterDTO,
    ): Promise<CompanyResponsePaginatedDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [companies, total] =
            await this.prismaService.company.findManyAndCount({
                include: {
                    bannerImage: true,
                    medias: true,
                },
                where: this.buildSearchParams(query, filters),
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
            })

        return buildPaginatedResponse(companies, total, pagination)
    }

    async update(
        id: string,
        rawData: CompanyUpdateDTO,
    ): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyUpdateInput>()({
            ...omit(rawData, [
                'settings',
                'contacts',
                'companyMedias',
                'bannerImageId',
            ]),
            settings:
                rawData.settings !== null ? rawData.settings : Prisma.DbNull,
            contacts: rawData.contacts ? rawData.contacts : undefined,
            mapCoordinates:
                rawData.mapCoordinates !== null
                    ? rawData.mapCoordinates
                    : Prisma.DbNull,
            bannerImage: rawData.bannerImageId
                ? { connect: { id: rawData.bannerImageId } }
                : { disconnect: true },
            facilities: rawData.facilities && {
                deleteMany: {
                    companyId: id,
                    facilityId: {
                        notIn:
                            rawData.facilities.map(
                                (facility) => facility.facilityId,
                            ) || [],
                    },
                },
                upsert: rawData.facilities.map((facility) => ({
                    where: {
                        company_facility_unique: {
                            companyId: id,
                            facilityId: facility.facilityId,
                        },
                    },
                    update: pick(facility, ['facilityId', 'order']),
                    create: pick(facility, ['facilityId', 'order']),
                })),
            },
            companyMedias: rawData.companyMedias && {
                deleteMany: {
                    companyId: id,
                    mediaId: {
                        notIn: rawData.companyMedias
                            .map((media) => media.mediaId)
                            .filter(Boolean),
                    },
                },
                upsert: rawData.companyMedias.map((media) => ({
                    where: {
                        company_media_unique: {
                            companyId: id,
                            mediaId: media.mediaId,
                        },
                    },
                    update: {
                        order: media.order,
                    },
                    create: pick(media, ['mediaId', 'order']),
                })),
            },
        })

        const result = await this.prismaService.company.update({
            where: { id },
            data: normalizedData,
            include: { bannerImage: true },
        })

        return result
    }

    detele(id: string) {
        return this.prismaService.company.delete({ where: { id } })
    }

    private buildSearchParams(
        query?: string,
        filters?: CompanySearchFilterDTO,
    ): Prisma.CompanyWhereInput {
        const data: Prisma.CompanyWhereInput = {}

        if (query) {
            data.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { shortDescription: { contains: query, mode: 'insensitive' } },
                { companyName: { contains: query, mode: 'insensitive' } },
                { state: { contains: query, mode: 'insensitive' } },
                { city: { contains: query, mode: 'insensitive' } },
            ]
        }

        if (filters) {
            data.published = filters?.published
            if (filters.userId)
                data.userCompanyRelation = { every: { userId: filters.userId } }
        }

        return data
    }
}
