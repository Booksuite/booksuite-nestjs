import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HostingRulesDTO } from './dto/HostingRules.dto'
import { HostingRulesResponseDTO } from './dto/HostingRulesResponse.dto'

@Injectable()
export class HostingRulesService {
    constructor(private prismaService: PrismaService) {}

    async getByCompanyId(
        companyId: string,
    ): Promise<HostingRulesResponseDTO | null> {
        const normalizedData = await this.prismaService.hostingRules.findUnique(
            { where: { companyId } },
        )

        return normalizedData
    }

    async upsert(
        companyId: string,
        rawData: HostingRulesDTO,
    ): Promise<HostingRulesResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.HostingRulesCreateInput>()({
                company: { connect: { id: companyId } },
                ...rawData,
            })

        return await this.prismaService.hostingRules.upsert({
            where: { companyId },
            create: normalizedData,
            update: { ...rawData },
        })
    }
}
