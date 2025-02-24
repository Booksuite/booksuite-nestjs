import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { BaseMediaService } from '../media/helpers/BaseMediaService'

import { HousingUnitTypeMediaDTO } from './dto/HousingUnitTypeMedia.dto'

@Injectable()
export class HousingUnitTypeMediaService extends BaseMediaService {
    normalizeMediasToCreate(
        medias: HousingUnitTypeMediaDTO[] | undefined,
    ):
        | Prisma.HousingUnitTypeMediaCreateWithoutHousingUnitTypeInput[]
        | undefined {
        if (!medias) return undefined

        return super.normalizeCreate(medias, (media) => ({
            isFeatured: media.isFeatured,
            order: media.order,
        }))
    }

    normalizeMediasToUpdate(
        medias: HousingUnitTypeMediaDTO[] | undefined,
    ):
        | Prisma.HousingUnitTypeMediaUpdateWithWhereUniqueWithoutHousingUnitTypeInput[]
        | undefined {
        if (!medias) return undefined

        return super.normalizeToUpdate(medias, (media) => ({
            isFeatured: media.isFeatured,
            order: media.order,
        }))
    }

    normalizeMediasToDelete(
        housingUnitTypeId: string,
        medias: HousingUnitTypeMediaDTO[] | undefined,
    ): Prisma.HousingUnitTypeMediaScalarWhereInput | undefined {
        if (!medias) return undefined

        const idsToNotDelete = this.extractIdsToNotDelete(medias)

        return { housingUnitTypeId, id: { notIn: idsToNotDelete } }
    }
}
