import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { BaseFacilityService } from '../facility/helpers/BaseFacilityService'

import { HousingUnitTypeFacilityDTO } from './dto/HousingUnitTypeFacility.dto'

@Injectable()
export class HousingUnitTypeFacilityService extends BaseFacilityService {
    normalizeFacilitiesToCreate(
        facilities: HousingUnitTypeFacilityDTO[] | undefined,
    ):
        | Prisma.HousingUnitTypeFacilityCreateWithoutHousingUnitTypeInput[]
        | undefined {
        if (!facilities) return undefined

        return super.normalizeCreate(facilities, (facility) => ({
            isFeatured: facility.isFeatured,
        }))
    }

    normalizeFacilitiesToUpdate(
        medias: HousingUnitTypeFacilityDTO[] | undefined,
    ):
        | Prisma.HousingUnitTypeFacilityUpdateWithWhereUniqueWithoutHousingUnitTypeInput[]
        | undefined {
        if (!medias) return undefined

        return super.normalizeToUpdate(medias, (media) => ({
            isFeatured: media.isFeatured,
        }))
    }

    normalizeFacilitiesToDelete(
        housingUnitTypeId: string,
        facilities: HousingUnitTypeFacilityDTO[],
    ): Prisma.HousingUnitTypeFacilityScalarWhereInput {
        const idsToNotDelete = this.extractIdsToNotDelete(facilities)

        return { housingUnitTypeId, id: { notIn: idsToNotDelete } }
    }
}
