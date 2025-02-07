import { Injectable } from '@nestjs/common'

import { Company } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService) {}

    createCompany(companyData: Company) {
        return this.prismaService.company.create({ data: companyData })
    }

    getCompanyByID(companyID: number) {
        return this.prismaService.company.findUnique({
            where: { id: companyID },
        })
    }

    updateCompany(companyID: number, updatedData: Company) {
        return this.prismaService.company.update({
            where: { id: companyID },
            data: updatedData,
        })
    }

    deleteCompany(companyID: number) {
        return this.prismaService.company.delete({ where: { id: companyID } })
    }

    getCompanyProperties(companyID: number) {
        return this.prismaService.company.findMany({
            where: { id: companyID },
            include: { properties: true },
        })
    }
}
