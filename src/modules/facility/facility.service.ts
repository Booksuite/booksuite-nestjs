import { Injectable } from '@nestjs/common'

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

    delete(facilityId: string) {
        return this.prismaService.facility.delete({
            where: { id: facilityId },
        })
    }
}
