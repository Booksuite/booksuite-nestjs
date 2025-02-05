import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { saveCompanyPayload } from './company.interface';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {}

    async createCompany(companyData: saveCompanyPayload) {
        return this.prisma.company.create({data: companyData})
    }

    async getCompanyByID(companyID: number){
        return this.prisma.company.findUnique({where: {
            id: companyID
        }})
    }

    async updateCompany(companyID: number, updatedData: saveCompanyPayload) {
        return this.prisma.company.update({
            where: {id: companyID},
            data: updatedData
        })
    }

    async deleteCompany(companyID: number){
        return this.prisma.company.delete({where: {id: companyID}})
    }

}
