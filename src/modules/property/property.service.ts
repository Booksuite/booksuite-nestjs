import { Injectable } from '@nestjs/common'

import { Property } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class PropertyService {
    constructor(private prisma: PrismaService) {}

    createProperty(propertyData: Property) {
        return this.prisma.property.create({ data: propertyData })
    }

    getPropertyByID(propertyID: number) {
        return this.prisma.property.findUnique({ where: { id: propertyID } })
    }

    updateProperty(propertyID: number, updatedData: Property) {
        return this.prisma.property.update({
            where: { id: propertyID },
            data: updatedData,
        })
    }

    deleteProperty(propertyID: number) {
        return this.prisma.property.delete({ where: { id: propertyID } })
    }
}
