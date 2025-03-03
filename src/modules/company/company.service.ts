import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyCreateDTO } from './dto/CompanyCreate.dto'
import { CompanyResponseDTO } from './dto/CompanyResponse.dto'
import { CompanyResponseFullDTO } from './dto/CompanyResponseFull.dto'

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: CompanyCreateDTO): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyCreateInput>()({
            ...rawData,
            facilities: {
                createMany: { data: rawData.facilities },
            },
            contacts: rawData.contacts || [],
        })

        return this.prismaService.company.create({ data: normalizedData })
    }

    getById(id: string): Promise<CompanyResponseFullDTO | null> {
        return this.prismaService.company.findUnique({
            where: { id },
            include: {
                facilities: { include: { facility: true } },
            },
        })
    }

    update(id: string, rawData: CompanyCreateDTO): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyUpdateInput>()({
            ...rawData,
            contacts: rawData.contacts || [],
            facilities: {
                createMany: { data: rawData.facilities },
                deleteMany: {
                    companyId: id,
                    facilityId: {
                        notIn: rawData.facilities.map(
                            (facility) => facility.facilityId,
                        ),
                    },
                },
            },
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
