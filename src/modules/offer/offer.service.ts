import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { PaginationQueryDTO } from '@/common/dto/PaginationRequest.dto'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '../prisma/prisma.service'

import { CreateOfferDto } from './dto/create-offer.dto'
import { OfferResponseDTO } from './dto/offer-response.dto'
import { OfferResponseFullDTO } from './dto/offer-response-full.dto'
import { OfferOrderByDTO } from './dto/OfferOrderBy.dto'
import { OfferResponsePaginatedDTO } from './dto/OfferResponsePaginated.dto'
import { OfferSearchFilterDTO } from './dto/OfferSearchFilter.dto'
import { UpdateOfferDto } from './dto/update-offer.dto'

@Injectable()
export class OfferService {
    constructor(private prismaService: PrismaService) {}

    create(
        companyId: string,
        createOfferDto: CreateOfferDto,
    ): Promise<OfferResponseDTO> {
        const {
            validHousingUnitTypes,
            validPaymentMethods,
            validServices,
            ...offerData
        } = createOfferDto

        return this.prismaService.offer
            .create({
                data: {
                    ...offerData,
                    companyId,
                    validHousingUnitTypes: {
                        create: validHousingUnitTypes.map((typeId) => ({
                            housingUnitType: { connect: { id: typeId } },
                        })),
                    },
                    validPaymentMethods: {
                        create: validPaymentMethods.map((methodId) => ({
                            paymentMethod: { connect: { id: methodId } },
                        })),
                    },
                    validServices: {
                        create: validServices.map((serviceId) => ({
                            service: { connect: { id: serviceId } },
                        })),
                    },
                },
            })
            .then((offer) => {
                return {
                    ...offer,
                    visibilityStartDate: dayjs(
                        offer.visibilityStartDate,
                    ).format('YYYY-MM-DD'),
                    startDate: dayjs(offer.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(offer.endDate).format('YYYY-MM-DD'),
                }
            })
    }

    async getById(id: string): Promise<OfferResponseFullDTO | null> {
        return this.prismaService.offer
            .findUnique({
                where: { id },
                include: {
                    validHousingUnitTypes: {
                        include: { housingUnitType: true },
                    },
                    validPaymentMethods: {
                        include: { paymentMethod: true },
                    },
                    validServices: {
                        include: { service: true },
                    },
                },
            })
            .then((offer) => {
                if (!offer) return null

                return {
                    ...offer,
                    visibilityStartDate: dayjs(
                        offer.visibilityStartDate,
                    ).format('YYYY-MM-DD'),
                    startDate: dayjs(offer.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(offer.endDate).format('YYYY-MM-DD'),
                }
            })
    }

    async search(
        companyId: string,
        pagination: PaginationQueryDTO,
        order?: OfferOrderByDTO,
        query?: string,
        filters?: OfferSearchFilterDTO,
    ): Promise<OfferResponsePaginatedDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [offers, total] = await this.prismaService.offer.findManyAndCount(
            {
                include: {
                    validHousingUnitTypes: {
                        include: { housingUnitType: true },
                    },
                    validPaymentMethods: {
                        include: { paymentMethod: true },
                    },
                    validServices: {
                        include: { service: true },
                    },
                },
                where: this.buildSearchParams(companyId, query, filters),
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
            },
        )

        return buildPaginatedResponse(
            offers.map((offer) => ({
                ...offer,
                visibilityStartDate: dayjs(offer.visibilityStartDate).format(
                    'YYYY-MM-DD',
                ),
                startDate: dayjs(offer.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(offer.endDate).format('YYYY-MM-DD'),
            })),
            total,
            pagination,
        )
    }

    update(
        id: string,
        updateOfferDto: UpdateOfferDto,
    ): Promise<OfferResponseDTO> {
        const {
            validHousingUnitTypes,
            validPaymentMethods,
            validServices,
            ...offerData
        } = updateOfferDto

        return this.prismaService.offer
            .update({
                where: { id },
                data: {
                    ...offerData,
                    validHousingUnitTypes: validHousingUnitTypes && {
                        deleteMany: {
                            offerId: id,
                            id: { notIn: validHousingUnitTypes },
                        },
                        upsert: validHousingUnitTypes.map((typeId) => ({
                            where: {
                                offer_housing_unit_type_unique: {
                                    offerId: id,
                                    housingUnitTypeId: typeId,
                                },
                            },
                            update: { housingUnitTypeId: typeId },
                            create: { housingUnitTypeId: typeId },
                        })),
                    },
                    validPaymentMethods: validPaymentMethods && {
                        deleteMany: {
                            offerId: id,
                            id: { notIn: validPaymentMethods },
                        },
                        upsert: validPaymentMethods.map((methodId) => ({
                            where: {
                                offer_payment_method_unique: {
                                    offerId: id,
                                    paymentMethodId: methodId,
                                },
                            },
                            update: { paymentMethodId: methodId },
                            create: { paymentMethodId: methodId },
                        })),
                    },
                    validServices: validServices && {
                        deleteMany: {
                            offerId: id,
                            id: { notIn: validServices },
                        },
                        upsert: validServices.map((serviceId) => ({
                            where: {
                                offer_service_unique: {
                                    offerId: id,
                                    serviceId: serviceId,
                                },
                            },
                            update: { serviceId: serviceId },
                            create: { serviceId: serviceId },
                        })),
                    },
                },
                include: {
                    validHousingUnitTypes: {
                        include: { housingUnitType: true },
                    },
                    validPaymentMethods: {
                        include: { paymentMethod: true },
                    },
                    validServices: {
                        include: { service: true },
                    },
                },
            })
            .then((offer) => {
                return {
                    ...offer,
                    visibilityStartDate: dayjs(
                        offer.visibilityStartDate,
                    ).format('YYYY-MM-DD'),
                    startDate: dayjs(offer.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(offer.endDate).format('YYYY-MM-DD'),
                }
            })
    }

    delete(id: string) {
        return this.prismaService.offer.delete({
            where: { id },
        })
    }

    private buildSearchParams(
        companyId?: string,
        query?: string,
        filters?: OfferSearchFilterDTO,
    ): Prisma.OfferWhereInput {
        const data: Prisma.OfferWhereInput = { companyId }

        if (query) {
            data.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { couponCode: { contains: query, mode: 'insensitive' } },
            ]
        }

        if (filters) {
            data.published = filters?.published
            if (filters.companyId) data.companyId = filters.companyId
        }

        return data
    }
}
