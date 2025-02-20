import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HousingUnitTypeMediaCreateDTO } from './dto/HousingUnitTypeMediaCreate.dto'

@Injectable()
export class HousingUnitTypeMediasService {
    constructor(private prismaService: PrismaService) {}

    async upsert(housingMediaData: HousingUnitTypeMediaCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.HousingUnitTypeMediaUpsertArgs>()({
                where: { id: housingMediaData.id },
                update: { mediaId: housingMediaData.media.id },
                create: {
                    ...omit(housingMediaData, ['id', 'media']),
                },
            })

        return await this.prismaService.housingUnitTypeMedia.upsert({
            ...normalizedData,
        })
    }
}
