import { Injectable } from '@nestjs/common'
import { CompanyContact, Prisma } from '@prisma/client'

import { PaginatedResponse, PaginationQuery } from '@/common/types/pagination'
import { buildPaginatedResponse } from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyContactCreateDTO } from './dto/CompanyContactCreate.dto'

@Injectable()
export class CompanyContactService {
    constructor(private prismaService: PrismaService) {}

    create(companyId: string, rawData: CompanyContactCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.CompanyContactCreateInput>()({
                ...rawData,
                company: { connect: { id: companyId } },
            })

        return this.prismaService.companyContact.create({
            data: normalizedData,
        })
    }

    async list(
        companyId: string,
        pagination: PaginationQuery,
    ): Promise<PaginatedResponse<CompanyContact>> {
        const [contacts, totalContacts] =
            await this.prismaService.companyContact.findManyAndCount({
                where: { companyId },
            })

        return buildPaginatedResponse(contacts, totalContacts, pagination)
    }

    update(companyId: string, id: string, rawData: CompanyContactCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.CompanyContactUpdateInput>()(rawData)

        return this.prismaService.companyContact.update({
            where: { id, companyId },
            data: normalizedData,
        })
    }

    delete(companyId: string, id: string) {
        return this.prismaService.companyContact.delete({
            where: { companyId, id },
        })
    }
}
