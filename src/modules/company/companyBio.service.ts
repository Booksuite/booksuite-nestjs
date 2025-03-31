import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as dayjs from 'dayjs'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyBioDTO } from './dto/CompanyBio.dto'
import { CompanyBioOrderByDTO } from './dto/CompanyBioOrderBy.dto'
import { CompanyBioPaginatedResponseDTO } from './dto/CompanyBioPaginatedResponse.dto'
import { CompanyBioResponseDTO } from './dto/CompanyBioResponse.dto'
import { CompanyBioSearchFilterDTO } from './dto/CompanyBioSearchFilter.dto'
import { CompanyBioUpdateDTO } from './dto/CompanyBioUpdate.dto'
@Injectable()
export class CompanyBioService {
    constructor(private prismaService: PrismaService) {}

    async getById(id: string): Promise<CompanyBioResponseDTO | null> {
        return await this.prismaService.companyBio.findUnique({
            where: { id },
        })
    }

    async create(
        companyId: string,
        rawData: CompanyBioDTO,
    ): Promise<CompanyBioResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyBioCreateInput>()(
            {
                company: { connect: { id: companyId } },
                ...rawData,
                startDate: rawData.startDate
                    ? dayjs(rawData.startDate).toDate()
                    : null,
                endDate: rawData.endDate
                    ? dayjs(rawData.endDate).toDate()
                    : null,
            },
        )

        return await this.prismaService.companyBio.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: CompanyBioUpdateDTO,
    ): Promise<CompanyBioResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyBioUpdateInput>()(
            {
                ...rawData,
                startDate: rawData.startDate
                    ? dayjs(rawData.startDate).toDate()
                    : null,
                endDate: rawData.endDate
                    ? dayjs(rawData.endDate).toDate()
                    : null,
            },
        )

        return await this.prismaService.companyBio.update({
            where: { id: id },
            data: normalizedData,
        })
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        order?: CompanyBioOrderByDTO,
        filter?: CompanyBioSearchFilterDTO,
        query?: string,
    ): Promise<CompanyBioPaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [companyBio, totalBios] =
            await this.prismaService.companyBio.findManyAndCount({
                where: {
                    ...this.buildSearchParams(query, filter),
                    companyId,
                },
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
            })

        return buildPaginatedResponse(companyBio, totalBios, pagination)
    }

    private buildSearchParams(
        query?: string,
        filters?: CompanyBioSearchFilterDTO,
    ): Prisma.CompanyBioWhereInput {
        const data: Prisma.CompanyBioWhereInput = {}

        if (query) {
            data.OR = [
                { title: { contains: query, mode: 'insensitive' } },
                { buttonLink: { contains: query, mode: 'insensitive' } },
            ]
        }

        if (filters) data.published = filters?.published

        return data
    }
}
