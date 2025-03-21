import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

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

    create(rawData: CompanyCreateDTO): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyCreateInput>()({
            ...omit(rawData, ['bannerImageId']),
            bannerImage: {
                connect: { id: rawData.bannerImageId },
            },
            facilities: rawData.facilities
                ? {
                      createMany: { data: rawData.facilities },
                  }
                : undefined,
            contacts: rawData.contacts || undefined,
        })

        return this.prismaService.company.create({
            data: normalizedData,
            include: { bannerImage: true },
        })
    }

    async getById(id: string): Promise<CompanyResponseFullDTO | null> {
        return this.prismaService.company.findUnique({
            where: { id },
            include: {
                facilities: { include: { facility: true } },
                bannerImage: true,
            },
        })
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
            ...rawData,
            settings: rawData.settings || Prisma.DbNull,
            contacts: rawData.contacts || [],
            facilities: rawData.facilities
                ? {
                      createMany: { data: rawData.facilities },
                      deleteMany: {
                          companyId: id,
                          facilityId: {
                              notIn: rawData.facilities.map(
                                  (facility) => facility.facilityId,
                              ),
                          },
                      },
                  }
                : undefined,
        })

        return this.prismaService.company.update({
            where: { id },
            data: normalizedData,
            include: { bannerImage: true },
        })
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
