import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { pick } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { SeasonRulesDTO } from './dto/SeasonRules.dto'
import { SeasonRulesResponseDTO } from './dto/SeasonRulesResponse.dto'
import { SeasonRulesResponseFullDTO } from './dto/SeasonRulesResponseFull.dto'
import { SeasonRulesUpdateDTO } from './dto/SeasonRulesUpdate.dto'

@Injectable()
export class SeasonRulesService {
    constructor(private prismaService: PrismaService) {}

    async getById(id: string): Promise<SeasonRulesResponseFullDTO | null> {
        return await this.prismaService.seasonRules.findUnique({
            where: { id },
            include: {
                housingUnitTypesPrices: { include: { housingUnitType: true } },
            },
        })
    }

    async create(
        companyId: string,
        rawData: SeasonRulesDTO,
    ): Promise<SeasonRulesResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.SeasonRulesCreateInput>()({
                company: { connect: { id: companyId } },
                ...rawData,
                housingUnitTypesPrices: {
                    createMany: { data: rawData.housingUnitTypesPrices },
                },
            })

        return await this.prismaService.seasonRules.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: SeasonRulesUpdateDTO,
    ): Promise<SeasonRulesResponseFullDTO> {
        const normalizedData =
            Prisma.validator<Prisma.SeasonRulesUpdateInput>()({
                ...rawData,
                housingUnitTypesPrices: {
                    deleteMany: {
                        seasonRuleId: id,
                        housingUnitTypeId: {
                            notIn:
                                rawData.housingUnitTypesPrices?.map(
                                    (h) => h.housingUnitTypeId,
                                ) || [],
                        },
                    },
                    upsert: rawData.housingUnitTypesPrices?.map(
                        (housingUnitType) => ({
                            where: {
                                seasonRule_housingunittype_unique: {
                                    seasonRuleId: id,
                                    housingUnitTypeId:
                                        housingUnitType.housingUnitTypeId,
                                },
                            },
                            update: pick(housingUnitType, [
                                'housingUnitTypeId',
                                'WeekendBasePrice',
                                'WeekendNewPrice',
                                'baseWeekPrice',
                                'newWeekPrice',
                            ]),
                            create: pick(housingUnitType, [
                                'housingUnitTypeId',
                                'WeekendBasePrice',
                                'WeekendNewPrice',
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
                housingUnitTypesPrices: { include: { housingUnitType: true } },
            },
        })
    }
}
