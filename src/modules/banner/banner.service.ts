import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerCreateDTO } from './dto/BannerCreate.dto'

@Injectable()
export class BannerService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: BannerCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.BannerCreateInput>()({
            ...rawData,
            medias: { createMany: { data: rawData.medias } },
        })

        return this.prismaService.banner.create({
            data: normalizedData,
        })
    }

    getById(id: string) {
        return this.prismaService.banner.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: BannerCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.BannerUpdateInput>()({
            ...rawData,
            medias: {
                upsert: rawData.medias.map((media) => ({
                    create: media,
                    where: { id: media.id },
                    update: omit(media, ['bannerId', 'mediaId']),
                })),
            },
        })

        return this.prismaService.banner.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.banner.delete({
            where: { id: id },
        })
    }
}
