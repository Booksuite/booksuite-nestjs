import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { extracBatchUpdateSet } from '@/common/utils/extracBatchUpdateSet'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerCreateDTO } from './dto/BannerCreate.dto'

@Injectable()
export class BannerService {
    constructor(private prismaService: PrismaService) {}

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
        const { idsToNotDelete, toCreate, toUpdate } = extracBatchUpdateSet(
            rawData.medias,
        )

        const normalizedData = Prisma.validator<Prisma.BannerUpdateInput>()({
            ...rawData,
            medias: {
                create: toCreate.map((media) => ({
                    media: {
                        create: { url: media.url, metadata: media.metadata },
                    },
                    order: media.order,
                })),
                update: toUpdate.map((media) => ({
                    data: {
                        media: {
                            update: {
                                url: media.url,
                                metadata: media.metadata,
                            },
                        },
                        order: media.order,
                    },
                    where: { id: media.id },
                })),
                deleteMany: { id: { notIn: idsToNotDelete }, bannerId: id },
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
