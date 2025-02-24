import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { BaseMediaService } from '../media/helpers/BaseMediaService'

import { BannerMediaDTO } from './dto/BannerMedia.dto'

@Injectable()
export class BannerMediaService extends BaseMediaService {
    normalizeMediasToCreate(
        medias: BannerMediaDTO[] | undefined,
    ): Prisma.BannerMediaCreateWithoutBannerInput[] | undefined {
        if (!medias) return undefined

        return super.normalizeCreate(medias, (media) => ({
            order: media.order,
        }))
    }

    normalizeMediasToUpdate(
        medias: BannerMediaDTO[] | undefined,
    ): Prisma.BannerMediaUpdateWithWhereUniqueWithoutBannerInput[] | undefined {
        if (!medias) return undefined

        return super.normalizeToUpdate(medias, (media) => ({
            order: media.order,
        }))
    }

    normalizeMediasToDelete(
        bannerId: string,
        medias: BannerMediaDTO[] | undefined,
    ): Prisma.BannerMediaScalarWhereInput | undefined {
        if (!medias) return undefined

        const idsToNotDelete = this.extractIdsToNotDelete(medias)

        return { bannerId, id: { notIn: idsToNotDelete } }
    }
}
