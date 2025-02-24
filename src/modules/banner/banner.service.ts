import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerMediaService } from './bannerMedia.service'
import { BannerCreateDTO } from './dto/BannerCreate.dto'

@Injectable()
export class BannerService {
    constructor(
        private prismaService: PrismaService,
        private bannerMediaService: BannerMediaService,
    ) {}

    create(rawData: BannerCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.BannerCreateInput>()({
            ...rawData,
            medias: {
                create: rawData.medias.map((media) => ({
                    media: {
                        create: { url: media.url, metadata: media.metadata },
                    },
                    order: media.order,
                })),
            },
        })

        return this.prismaService.banner.create({
            data: normalizedData,
        })
    }

    getById(
        id: string,
    ): Promise<Prisma.BannerGetPayload<{ include: { medias: true } }> | null> {
        return this.prismaService.banner.findUnique({
            where: { id },
            include: { medias: true },
        })
    }

    update(id: string, rawData: BannerCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.BannerUpdateInput>()({
            ...rawData,
            medias: {
                create: this.bannerMediaService.normalizeMediasToCreate(
                    rawData.medias,
                ),
                update: this.bannerMediaService.normalizeMediasToUpdate(
                    rawData.medias,
                ),
                deleteMany: this.bannerMediaService.normalizeMediasToDelete(
                    id,
                    rawData.medias,
                ),
            },
        })

        return this.prismaService.banner.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.banner.delete({
            where: { id },
        })
    }
}
