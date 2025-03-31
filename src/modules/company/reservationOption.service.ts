import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { pick } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ReservationOptionDTO } from './dto/ReservationOption.dto'
import { ReservationOptionResponseFullDTO } from './dto/ReservationOptionResponse.dto'
import { ReservationOptionResponseDTO } from './dto/ReservationOptionResponse.dto copy'

@Injectable()
export class ReservationOptionService {
    constructor(private prismaService: PrismaService) {}

    async getById(
        id: string,
    ): Promise<ReservationOptionResponseFullDTO | null> {
        return await this.prismaService.reservationOption.findUnique({
            where: { id },
            include: {
                availableHousingUnitTypes: {
                    include: { housingUnitType: true },
                },
            },
        })
    }

    async create(
        companyId: string,
        rawData: ReservationOptionDTO,
    ): Promise<ReservationOptionResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationOptionCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
                availableHousingUnitTypes: {
                    createMany: { data: rawData.availableHousingUnitTypes },
                },
            })

        return await this.prismaService.reservationOption.create({
            data: normalizedData,
        })
    }

    async update(
        id: string,
        rawData: ReservationOptionDTO,
    ): Promise<ReservationOptionResponseFullDTO> {
        const normalizedData =
            Prisma.validator<Prisma.ReservationOptionUpdateInput>()({
                ...rawData,
                availableHousingUnitTypes: {
                    deleteMany: {
                        reservationOptionId: id,
                        housingUnitTypeId: {
                            notIn:
                                rawData.availableHousingUnitTypes?.map(
                                    (housingUnitType) =>
                                        housingUnitType.housingUnitTypeId,
                                ) || [],
                        },
                    },
                    upsert: rawData.availableHousingUnitTypes?.map(
                        (housingUnitType) => ({
                            where: {
                                reservationoption_housingunittype_unique: {
                                    reservationOptionId: id,
                                    housingUnitTypeId:
                                        housingUnitType.housingUnitTypeId,
                                },
                            },
                            update: pick(housingUnitType, [
                                'housingUnitTypeId',
                            ]),
                            create: pick(housingUnitType, [
                                'housingUnitTypeId',
                            ]),
                        }),
                    ),
                },
            })

        return await this.prismaService.reservationOption.update({
            where: { id },
            data: normalizedData,
            include: {
                availableHousingUnitTypes: {
                    include: { housingUnitType: true },
                },
            },
        })
    }
}
