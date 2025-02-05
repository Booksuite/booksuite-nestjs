import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PropertySavePayload } from './property.interface';

@Injectable()
export class PropertyService {

    constructor(private prisma: PrismaService) {}

    async createProperty(propertyData: PropertySavePayload){
        return this.prisma.property.create({data: propertyData})
    }

    async getPropertyByID(propertyID: number){
        return this.prisma.property.findUnique({where: {id: propertyID}})
    }

    async updateProperty(propertyID: number, updatedData: PropertySavePayload){
        return this.prisma.property.update({
            where: {id : propertyID},
            data: updatedData
        })
    }

    async deleteProperty(propertyID: number){
        return this.prisma.property.delete({where: {id: propertyID}})
    }

    async getCompanyProperties(companyID: number){
        return this.prisma.property.findMany({
            where: {companyId: companyID}
        })
    }

}
