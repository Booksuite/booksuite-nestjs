import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'
import { MediaService } from '../media/media.service'

import { HousingUnitTypeCreateDTO } from './dto/HousingUnitTypeCreate.dto'
import { HousingUnitTypeMediasService } from './housingUnitTypeMedias.service'

@Injectable()
export class HousingUnitTypeService {
    constructor(
        private prismaService: PrismaService,
        private mediaService: MediaService,
        private typeMediaService: HousingUnitTypeMediasService,
    ) {}

    async create(rawData: HousingUnitTypeCreateDTO) {
        const normalizedData: Prisma.HousingUnitTypeCreateInput = omit(
            rawData,
            ['medias'],
        )

        const createdData = await this.prismaService.housingUnitType.create({
            data: normalizedData,
        })

        if (rawData.medias) {
            await Promise.all(
                rawData.medias.map(async (medias) => {
                    const createdMedia = await this.mediaService.upsert({
                        ...medias.media,
                    })

                    medias.mediaId = createdMedia.id

                    await this.typeMediaService.upsert(medias)
                }),
            )
        }

        return createdData
    }

    getById(id: string) {
        return this.prismaService.housingUnitType.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: HousingUnitTypeCreateDTO) {
        const normalizedData: Prisma.HousingUnitTypeUpdateInput = omit(
            rawData,
            ['medias'],
        )

        // if (rawData.medias)
        //     normalizedData.medias = { createMany: { data: rawData.medias } }

        return this.prismaService.housingUnitType.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.housingUnitType.delete({ where: { id: id } })
    }

    listByCompanyId(companyId: string) {
        return this.prismaService.housingUnitType.findMany({
            where: { companyId },
        })
    }
}
