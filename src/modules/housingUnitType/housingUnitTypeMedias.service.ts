import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HousingUnitTypeMediaCreateDTO } from './dto/HousingUnitTypeMediaCreate.dto'

@Injectable()
export class HousingUnitTypeMediasService {
    constructor(private prismaService: PrismaService) {}

    upsert(rawData: HousingUnitTypeMediaCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeMediaCreateInput>()({
                ...omit(rawData, ['mediaId', 'propertyId']),
                media: { connect: { id: rawData.mediaId } },
                property: { connect: { id: rawData.propertyId } },
            })

        return this.prismaService.housingUnitTypeMedia.create({
            data: normalizedData,
        })
    }
}
