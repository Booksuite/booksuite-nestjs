import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'
import { HouseUnitTypeFacilityCreateDTO } from '../dto/HouseUnitTypeFacilityCreate.dto'

@Injectable()
export class HousingUnitTypeFacilityService {
    constructor(private prismaService: PrismaService) {}

    create(UnitTypeFacilityData: HouseUnitTypeFacilityCreateDTO) {
        return this.prismaService.$transaction(async (db) => {
            await db.houseUnitTypeFacility.create({
                data: UnitTypeFacilityData,
            })
        })
    }

    getById(id: string) {
        return this.prismaService.$transaction(async (db) => {
            await db.houseUnitTypeFacility.findUnique({
                where: { id: id },
            })
        })
    }

    update(id: string, UnitTypeFacilityData: HouseUnitTypeFacilityCreateDTO) {
        return this.prismaService.$transaction(async (db) => {
            await db.houseUnitTypeFacility.update({
                where: { id: id },
                data: UnitTypeFacilityData,
            })
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
