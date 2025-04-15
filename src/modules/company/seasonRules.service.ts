import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { pick } from 'radash'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { SeasonRuleCreateDTO } from './dto/SeasonRuleCreate.dto'
import { SeasonRuleOrderByDTO } from './dto/SeasonRuleOrderBy.dto'
import { SeasonRuleResponseDTO } from './dto/SeasonRuleResponse.dto'
import { SeasonRuleResponseFullDTO } from './dto/SeasonRuleResponseFull.dto'
import { SeasonRulePaginatedResponseDTO } from './dto/SeasonRuleResponsePaginated.dto'
import { SeasonRuleSearchFilterDTO } from './dto/SeasonRuleSearchFilterDTO.dto'
import { SeasonRuleUpdateDTO } from './dto/SeasonRuleUpdate.dto'

@Injectable()
export class SeasonRulesService {
    constructor(private prismaService: PrismaService) {}

    async getById(id: string): Promise<SeasonRuleResponseFullDTO | null> {
        return await this.prismaService.seasonRules.findUnique({
            where: { id },
            include: {
                housingUnitTypePrices: { include: { housingUnitType: true } },
            },
        })
    }

    async create(
        companyId: string,
        rawData: SeasonRuleCreateDTO,
    ): Promise<SeasonRuleResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.SeasonRulesCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                housingUnitTypePrices: {
                    createMany: { data: rawData.housingUnitTypePrices },
                },
            })

        return this.prismaService.seasonRules.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: SeasonRuleUpdateDTO,
    ): Promise<SeasonRuleResponseFullDTO> {
        const normalizedData =
            Prisma.validator<Prisma.SeasonRulesUpdateInput>()({
                ...rawData,
                housingUnitTypePrices: rawData.housingUnitTypesPrices && {
                    deleteMany: {
                        seasonRuleId: id,
                        housingUnitTypeId: {
                            notIn:
                                rawData.housingUnitTypesPrices.map(
                                    (h) => h.housingUnitTypeId,
                                ) || [],
                        },
                    },
                    upsert: rawData.housingUnitTypesPrices.map(
                        (housingUnitType) => ({
                            where: {
                                season_rule_housing_unit_type_unique: {
                                    seasonRuleId: id,
                                    housingUnitTypeId:
                                        housingUnitType.housingUnitTypeId,
                                },
                            },
                            update: pick(housingUnitType, [
                                'housingUnitTypeId',
                                'weekendBasePrice',
                                'weekendNewPrice',
                                'baseWeekPrice',
                                'newWeekPrice',
                            ]),
                            create: pick(housingUnitType, [
                                'housingUnitTypeId',
                                'weekendBasePrice',
                                'weekendNewPrice',
                                'baseWeekPrice',
                                'newWeekPrice',
                            ]),
                        }),
                    ),
                },
            })

        return await this.prismaService.seasonRules.update({
            where: { id },
            data: normalizedData,
            include: {
                housingUnitTypePrices: { include: { housingUnitType: true } },
            },
        })
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        order?: SeasonRuleOrderByDTO,
        filter?: SeasonRuleSearchFilterDTO,
        query?: string,
    ): Promise<SeasonRulePaginatedResponseDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [seasonRules, totalSeasonRules] =
            await this.prismaService.seasonRules.findManyAndCount({
                where: {
                    ...this.buildSearchParams(query, filter),
                    companyId,
                },
                ...paginationParams,
                orderBy: order
                    ? { [order.orderBy]: order.direction }
                    : undefined,
                include: {
                    housingUnitTypePrices: {
                        include: { housingUnitType: true },
                    },
                },
            })

        return buildPaginatedResponse(seasonRules, totalSeasonRules, pagination)
    }

    private buildSearchParams(
        query?: string,
        filters?: SeasonRuleSearchFilterDTO,
    ): Prisma.SeasonRulesWhereInput {
        const data: Prisma.SeasonRulesWhereInput = {}

        if (query) {
            data.OR = [{ name: { contains: query, mode: 'insensitive' } }]
        }

        if (filters) {
            data.published = filters?.published
            data.startDate = {
                gte: filters.startDate?.start,
                lte: filters.startDate?.end,
            }
            data.endDate = {
                gte: filters.endDate?.start,
                lte: filters.endDate?.end,
            }
        }

        return data
    }
}
