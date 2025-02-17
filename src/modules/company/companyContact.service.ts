import { Injectable } from '@nestjs/common'
import { CompanyContact, Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyContactCreateDTO } from './dto/CompanyContactCreate.dto'

@Injectable()
export class CompanyContactService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: CompanyContactCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.CompanyContactCreateInput>()({
                ...omit(rawData, ['companyId']),
                company: { connect: { id: rawData.companyId } },
            })

        return this.prismaService.$transaction(async (db) => {
            await db.companyContact.create({ data: normalizedData })
        })
    }

    list(companyId: string): Promise<CompanyContact[]> {
        return this.prismaService.companyContact.findMany({
            where: { companyId },
        })
    }

    getByID(id: string) {
        return this.prismaService.company.findUnique({
            where: { id: id },
        })
    }

    update(id: string, rawData: CompanyContactCreateDTO) {
        return this.prismaService.company.update({
            where: { id },
            data: omit(rawData, ['companyId']),
        })
    }

    delete(id: string) {
        return this.prismaService.company.delete({ where: { id } })
    }
}
