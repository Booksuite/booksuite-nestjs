import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { FacilityDTO } from './dto/Facility.dto'

@Injectable()
export class FacilityService {
    constructor(private prismaService: PrismaService) {}

    create(facilityData: FacilityDTO) {
        return this.prismaService.facility.create({
            data: facilityData,
        })
    }

    getById(faciltyId: string) {
        return this.prismaService.facility.findUnique({
            where: { id: faciltyId },
        })
    }

    update(facilityId: string, facilityData: FacilityDTO) {
        return this.prismaService.facility.update({
            where: { id: facilityId },
            data: facilityData,
        })
    }

    delete(facilityId: string) {
        return this.prismaService.facility.delete({
            where: { id: facilityId },
        })
    }
}
