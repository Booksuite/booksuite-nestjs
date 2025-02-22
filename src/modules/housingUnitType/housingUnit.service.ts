import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { DataHandlerHelper } from '@/common/utils/DataHandlerHelper'

import { HousingUnitDTO } from './dto/HousingUnit.dto'

@Injectable()
export class HousingUnitService extends DataHandlerHelper {
    normalizeHousingUnitsToCreateMany(
        housingUnits: HousingUnitDTO[],
    ): Prisma.HousingUnitCreateManyHousingUnitTypeInputEnvelope {
        const toCreate = this.extractToCreate(housingUnits)
        return { data: toCreate }
    }

    normalizeHousingUnitsToUpdate(
        medias: HousingUnitDTO[],
    ): Prisma.HousingUnitUpdateWithWhereUniqueWithoutHousingUnitTypeInput[] {
        const toUpdate = this.extractToUpdate(medias)
        return toUpdate.map((unit) => ({
            data: { name: unit.name },
            where: { id: unit.id },
        }))
    }

    normalizeHousingUnitsToDelete(
        housingUnitTypeId: string,
        housingUnits: HousingUnitDTO[],
    ): Prisma.HousingUnitScalarWhereInput {
        const idsToNotDelete = this.extractIdsToNotDelete(housingUnits)
        return { housingUnitTypeId, id: { notIn: idsToNotDelete } }
    }
}
