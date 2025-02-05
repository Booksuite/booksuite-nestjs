import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { SaveCompanyPayload } from './company.interface'

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService) {}

    createCompany(companyData: SaveCompanyPayload) {
        return this.prismaService.company.create({ data: companyData })
    }

    getCompanyByID(companyID: number) {
        return this.prismaService.company.findUnique({
            where: { id: companyID },
        })
    }

    updateCompany(companyID: number, updatedData: SaveCompanyPayload) {
        return this.prismaService.company.update({
            where: { id: companyID },
            data: updatedData,
        })
    }

    deleteCompany(companyID: number) {
        return this.prismaService.company.delete({ where: { id: companyID } })
    }
}
