import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { NonOptionalId } from '@/common/types/helpers'

import { HousingUnitDTO } from './dto/HousingUnit.dto'

@Injectable()
export class HousingUnitService {
    normalizeMediasToCreateMany(
        housingUnits: HousingUnitDTO[],
    ): Prisma.HousingUnitCreateManyHousingUnitTypeInputEnvelope {
        return { data: housingUnits }
    }

    normalizeMediasToUpdate(
        medias: NonOptionalId<HousingUnitDTO>[],
    ): Prisma.HousingUnitUpdateWithWhereUniqueWithoutHousingUnitTypeInput[] {
        return medias.map((unit) => ({
            data: { name: unit.name },
            where: { id: unit.id },
        }))
    }
}
