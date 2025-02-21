import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { NonOptionalId } from '@/common/types/helpers'
import { BaseMediaService } from '../media/helpers/BaseMediaService'

import { BannerMediaDTO } from './dto/BannerMedia.dto'

@Injectable()
export class BannerMediaService extends BaseMediaService {
    normalizeMediasToCreate(
        medias: BannerMediaDTO[],
    ): Prisma.BannerMediaCreateWithoutBannerInput[] {
        return super.normalizeCreate(medias, (media) => ({
            order: media.order,
        }))
    }

    normalizeMediasToUpdate(
        medias: NonOptionalId<BannerMediaDTO>[],
    ): Prisma.BannerMediaUpdateWithWhereUniqueWithoutBannerInput[] {
        return super.normalizeToUpdate(medias, (media) => ({
            order: media.order,
        }))
    }
}
