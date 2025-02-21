import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { NonOptionalId } from '@/common/types/helpers'

import { BannerMediaDTO } from './dto/BannerMedia.dto'

@Injectable()
export class BannerMediaService {
    normalizeMediasToCreate(
        medias: BannerMediaDTO[],
    ): Prisma.BannerMediaCreateWithoutBannerInput[] {
        return medias.map((media) => ({
            media: {
                create: {
                    url: media.url,
                    metadata: media.metadata,
                },
            },
            order: media.order,
        }))
    }

    normalizeMediasToUpdate(
        medias: NonOptionalId<BannerMediaDTO>[],
    ): Prisma.BannerMediaUpdateWithWhereUniqueWithoutBannerInput[] {
        return medias.map((media) => ({
            data: {
                media: {
                    update: { url: media.url, metadata: media.metadata },
                },
                order: media.order,
            },
            where: { id: media.id },
        }))
    }
}
