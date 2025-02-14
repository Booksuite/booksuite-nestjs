import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HousingUnitDTO } from './dto/HousingUnitDTO'

@Injectable()
export class HousingUnitService {
    constructor(private prismaService: PrismaService) {}

    create(housingData: HousingUnitDTO) {
        return this.prismaService.housingUnit.create({
            data: housingData,
        })
    }

    getById(id: string) {
        return this.prismaService.housingUnit.findUnique({
            where: { id: id },
        })
    }

    update(id: string, housingData: HousingUnitDTO) {
        return this.prismaService.housingUnit.update({
            where: { id: id },
            data: housingData,
        })
    }

    delete(id: string) {
        return this.prismaService.housingUnit.delete({
            where: { id: id },
        })
    }
}
