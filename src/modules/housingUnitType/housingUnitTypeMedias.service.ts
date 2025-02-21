import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { NonOptionalId } from '@/common/types/helpers'
import { BaseMediaService } from '../media/helpers/BaseMediaService'

import { HousingUnitTypeMediaDTO } from './dto/HousingUnitTypeMedia.dto'

@Injectable()
export class HousingUnitTypeMediaService extends BaseMediaService {
    normalizeMediasToCreate(
        medias: HousingUnitTypeMediaDTO[],
    ): Prisma.HousingUnitTypeMediaCreateWithoutHousingUnitTypeInput[] {
        return super.normalizeCreate(medias, (media) => ({
            isFeatured: media.isFeatured,
            order: media.order,
        }))
    }

    normalizeMediasToUpdate(
        medias: NonOptionalId<HousingUnitTypeMediaDTO>[],
    ): Prisma.HousingUnitTypeMediaUpdateWithWhereUniqueWithoutHousingUnitTypeInput[] {
        return super.normalizeToUpdate(medias, (media) => ({
            isFeatured: media.isFeatured,
            order: media.order,
        }))
    }
}
