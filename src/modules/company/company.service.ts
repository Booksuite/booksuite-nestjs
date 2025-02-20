import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyCreateDTO } from './dto/CompanyCreate.dto'

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: CompanyCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.CompanyCreateInput>()({
            ...rawData,
            contacts: rawData.contacts || [],
        })

        return this.prismaService.company.create({ data: normalizedData })
    }

    getById(id: string) {
        return this.prismaService.company.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: CompanyCreateDTO) {
        const normalizedData = Prisma.validator<Prisma.CompanyUpdateInput>()({
            ...rawData,
            contacts: rawData.contacts || [],
        })

        return this.prismaService.company.update({
            where: { id },
            data: normalizedData,
        })
    }

    detele(id: string) {
        return this.prismaService.company.delete({ where: { id } })
    }
}
