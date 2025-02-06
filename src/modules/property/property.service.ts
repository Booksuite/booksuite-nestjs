import { PrismaService } from '@/modules/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

import { PropertySavePayload } from './property.interface'

@Injectable()
export class PropertyService {
    constructor(private prisma: PrismaService) {}

    createProperty(propertyData: PropertySavePayload) {
        return this.prisma.property.create({ data: propertyData })
    }

    getPropertyByID(propertyID: number) {
        return this.prisma.property.findUnique({ where: { id: propertyID } })
    }

    updateProperty(propertyID: number, updatedData: PropertySavePayload) {
        return this.prisma.property.update({
            where: { id: propertyID },
            data: updatedData,
        })
    }

    deleteProperty(propertyID: number) {
        return this.prisma.property.delete({ where: { id: propertyID } })
    }

    getCompanyProperties(companyID: number) {
        return this.prisma.property.findMany({
            where: { companyId: companyID },
        })
    }
}
