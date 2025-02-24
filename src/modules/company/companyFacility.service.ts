import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { BaseFacilityService } from '../facility/helpers/BaseFacilityService'

import { CompanyFacilityDTO } from './dto/CompanyFacility.dto'

@Injectable()
export class CompanyFacilityService extends BaseFacilityService {
    normalizeFacilitiesToCreate(
        facilities: CompanyFacilityDTO[] | undefined,
    ): Prisma.CompanyFacilityCreateWithoutCompanyInput[] | undefined {
        if (!facilities) return undefined

        return super.normalizeCreate(facilities)
    }

    normalizeFacilitiesToUpdate(
        medias: CompanyFacilityDTO[] | undefined,
    ):
        | Prisma.CompanyFacilityUpdateWithWhereUniqueWithoutCompanyInput[]
        | undefined {
        if (!medias) return undefined

        return super.normalizeToUpdate(medias)
    }

    normalizeFacilitiesToDelete(
        companyId: string,
        facilities: CompanyFacilityDTO[],
    ): Prisma.CompanyFacilityScalarWhereInput {
        const idsToNotDelete = this.extractIdsToNotDelete(facilities)

        return { companyId, id: { notIn: idsToNotDelete } }
    }
}
