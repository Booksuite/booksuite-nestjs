import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HouseUnitTypeFacilityCreateDTO } from './dto/HouseUnitTypeFacilityCreate.dto'

@Injectable()
export class HousingUnitTypeFacilityService {
    constructor(private prismaService: PrismaService) {}

    upsert(id: string, UnitTypeFacilityData: HouseUnitTypeFacilityCreateDTO) {
        return this.prismaService.houseUnitTypeFacility.upsert({
            where: { id },
            update: { facilityId: UnitTypeFacilityData.facilityId },
            create: {
                ...UnitTypeFacilityData,
            },
        })
    }

    listByUnitType(id: string) {
        return this.prismaService.houseUnitTypeFacility.findMany({
            where: { id },
        })
    }

    delete(id: string) {
        return this.prismaService.$transaction(async (db) => {
            await db.houseUnitTypeFacility.delete({
                where: { id: id },
            })
        })
    }
}
