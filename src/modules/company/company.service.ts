import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { CompanyFacilityService } from './companyFacility.service'
import { CompanyCreateDTO } from './dto/CompanyCreate.dto'
import { CompanyResponseDTO } from './dto/CompanyResponse.dto'
import { CompanyResponseFullDTO } from './dto/CompanyResponseFull.dto'

@Injectable()
export class CompanyService {
    constructor(
        private prismaService: PrismaService,
        private companyFacilityService: CompanyFacilityService,
    ) {}

    create(rawData: CompanyCreateDTO): Promise<CompanyResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.CompanyCreateInput>()({
            ...rawData,
            facilities: {
                create: this.companyFacilityService.normalizeFacilitiesToCreate(
                    rawData.facilities,
                ),
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
            facilities: {
                create: this.companyFacilityService.normalizeFacilitiesToCreate(
                    rawData.facilities,
                ),
                update: this.companyFacilityService.normalizeFacilitiesToUpdate(
                    rawData.facilities,
                ),
                deleteMany:
                    this.companyFacilityService.normalizeFacilitiesToDelete(
                        id,
                        rawData.facilities,
                    ),
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
