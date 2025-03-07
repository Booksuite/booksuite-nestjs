import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { FacilityDTO } from './dto/Facility.dto'
import { FacilityOrderByDTO } from './dto/FacilityOrderBy.dto'
import { FacilityResponseDTO } from './dto/FacilityResponse.dto'
import { FacilityResponsePaginatedDTO } from './dto/FacilityResponsePaginated.dto'
import { FacilitySearchFilterDTO } from './dto/FacilitySearchFilter.dto'

@Injectable()
export class FacilityService {
    constructor(private prismaService: PrismaService) {}

    create(facilityData: FacilityDTO): Promise<FacilityResponseDTO> {
        return this.prismaService.facility.create({
            data: facilityData,
        })
    }

    async list(
        pagination: PaginationQuery,
        order: FacilityOrderByDTO,
    ): Promise<FacilityResponsePaginatedDTO> {
        const paginatedParams = getPaginatedParams(pagination)

        const [facilities, total] =
            await this.prismaService.facility.findManyAndCount({
                ...paginatedParams,
                orderBy: { [order.orderBy]: order.order },
            })

        return buildPaginatedResponse(facilities, total, pagination)
    }

    getById(faciltyId: string): Promise<FacilityResponseDTO | null> {
        return this.prismaService.facility.findUnique({
            where: { id: faciltyId },
        })
    }

    update(
        facilityId: string,
        facilityData: FacilityDTO,
    ): Promise<FacilityResponseDTO> {
        return this.prismaService.facility.update({
            where: { id: facilityId },
            data: facilityData,
        })
    }

    async search(
        pagination: PaginationQuery,
        order?: FacilityOrderByDTO,
        filter?: FacilitySearchFilterDTO,
        query?: string,
    ): Promise<FacilityResponsePaginatedDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [facilities, total] =
            await this.prismaService.facility.findManyAndCount({
                where: { ...this.buildSearchParams(query, filter) },
                ...paginationParams,
                orderBy: order ? { [order.orderBy]: order.order } : undefined,
            })

        return buildPaginatedResponse(facilities, total, pagination)
    }

    private buildSearchParams(
        query?: string,
        filter?: FacilitySearchFilterDTO,
    ): Prisma.FacilityWhereInput {
        const data: Prisma.FacilityWhereInput = {}
        if (query) {
            data.OR = [{ name: { contains: query, mode: 'insensitive' } }]
        }

        if (filter) data.type = filter?.type

        return data
    }

    delete(facilityId: string) {
        return this.prismaService.facility.delete({
            where: { id: facilityId },
        })
    }
}
