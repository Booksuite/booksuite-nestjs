import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyCreateDTO } from './dto/companyCreate.dto'

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService) {}

    createCompany(companyData: CompanyCreateDTO) {
        return this.prismaService.$transaction(async (db) => {
            await db.company.create({ data: companyData })
        })
    }

    getCompanyByID(companyID: string) {
        return this.prismaService.company.findUnique({
            where: { id: companyID },
        })
    }

    updateCompany(companyID: string, updatedData: CompanyCreateDTO) {
        return this.prismaService.company.update({
            where: { id: companyID },
            data: updatedData,
        })
    }

    deleteCompany(companyID: string) {
        return this.prismaService.company.delete({ where: { id: companyID } })
    }
}
