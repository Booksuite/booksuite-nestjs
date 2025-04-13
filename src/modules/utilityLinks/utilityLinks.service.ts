import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { UtilityLinksDTO } from './dtos/UtilityLinks.dto'
import { UtilityLinksOrderByDTO } from './dtos/UtilityLinksOrderBy.dto'
import { UtilityLinksPaginatedResponseDTO } from './dtos/UtilityLinksPaginatedResponse.dto'
import { UtilityLinksResponseDTO } from './dtos/UtilityLinksResponse.dto'
import { UtilityLinksSearchFilterDTO } from './dtos/UtilityLinksSearchFilter.dto'
import { UtilityLinksUpdateDTO } from './dtos/UtilityLinksUpdate.dto'
@Injectable()
export class UtilityLinksService {
    constructor(private prismaService: PrismaService) {}

    async getById(id: string): Promise<UtilityLinksResponseDTO | null> {
        return await this.prismaService.utilityLinks.findUnique({
            where: { id },
        })
    }

    async create(
        companyId: string,
        rawData: UtilityLinksDTO,
    ): Promise<UtilityLinksResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.UtilityLinksCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                startDate: rawData.startDate
                    ? dayjs(rawData.startDate).toDate()
                    : null,
                endDate: rawData.endDate
                    ? dayjs(rawData.endDate).toDate()
                    : null,
            })

        return await this.prismaService.utilityLinks.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: UtilityLinksUpdateDTO,
    ): Promise<UtilityLinksResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.UtilityLinksUpdateInput>()({
                ...rawData,
                startDate: rawData.startDate
                    ? dayjs(rawData.startDate).toDate()
                    : null,
                endDate: rawData.endDate
                    ? dayjs(rawData.endDate).toDate()
                    : null,
            })

        return await this.prismaService.utilityLinks.update({
            where: { id: id },
            data: normalizedData,
        })
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        order?: UtilityLinksOrderByDTO,
        filter?: UtilityLinksSearchFilterDTO,
        query?: string,
    ): Promise<UtilityLinksPaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [utilityLinks, totalBios] =
            await this.prismaService.utilityLinks.findManyAndCount({
                where: {
                    ...this.buildSearchParams(query, filter),
                    companyId,
                },
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
            })

        return buildPaginatedResponse(utilityLinks, totalBios, pagination)
    }

    private buildSearchParams(
        query?: string,
        filters?: UtilityLinksSearchFilterDTO,
    ): Prisma.UtilityLinksWhereInput {
        const data: Prisma.UtilityLinksWhereInput = {}

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
