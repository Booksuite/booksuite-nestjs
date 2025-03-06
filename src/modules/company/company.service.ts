import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

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

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: CompanyCreateDTO): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyCreateInput>()({
            ...rawData,
            facilities: {
                createMany: { data: rawData.facilities },
            },
            contacts: rawData.contacts || [],
        })

        return this.prismaService.company.create({ data: normalizedData })
    }

    getById(id: string): Promise<CompanyResponseFullDTO | null> {
        return this.prismaService.company.findUnique({
            where: { id },
            include: {
                facilities: { include: { facility: true } },
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
                where: this.buildSearchParams(query, filters),
                ...paginationParams,
                orderBy: order ? { [order.orderBy]: order.order } : undefined,
            })

        return buildPaginatedResponse(companies, total, pagination)
    }

    update(id: string, rawData: CompanyCreateDTO): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyUpdateInput>()({
            ...rawData,
            contacts: rawData.contacts || [],
            facilities: {
                createMany: { data: rawData.facilities },
                deleteMany: {
                    companyId: id,
                    facilityId: {
                        notIn: rawData.facilities.map(
                            (facility) => facility.facilityId,
                        ),
                    },
                },
            },
        })

        return this.prismaService.company.update({
            where: { id },
            data: normalizedData,
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
