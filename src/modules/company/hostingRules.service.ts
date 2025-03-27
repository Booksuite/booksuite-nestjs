import { Injectable } from '@nestjs/common'
import { HostingRules, Prisma } from '@prisma/client'
import * as dayjs from 'dayjs'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { HostingRulesDTO } from './dto/HostingRules.dto'
import { HostingRulesResponseDTO } from './dto/HostingRulesResponse.dto'

@Injectable()
export class HostingRulesService {
    constructor(private prismaService: PrismaService) {}

    async getByCompanyId(
        companyId: string,
    ): Promise<HostingRulesResponseDTO | null> {
        const result = await this.prismaService.hostingRules.findUnique({
            where: { companyId },
        })

        if (!result) return null

        return this.normalize(result)
    }

    private normalize(result: HostingRules): HostingRulesResponseDTO {
        return {
            ...result,
            fixedStart: dayjs(result.fixedStart).format('YYYY-MM-DD'),
            fixedEnd: dayjs(result.fixedEnd).format('YYYY-MM-DD'),
        }
    }

    async upsert(
        companyId: string,
        rawData: HostingRulesDTO,
    ): Promise<HostingRulesResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.HostingRulesCreateInput>()({
                company: { connect: { id: companyId } },
                ...rawData,
                fixedStart: dayjs(rawData.fixedStart).toDate(),
                fixedEnd: dayjs(rawData.fixedEnd).add(1, 'hour').toDate(),
            })

        const result = await this.prismaService.hostingRules.upsert({
            where: { companyId },
            create: normalizedData,
            update: {
                ...rawData,
                fixedStart: dayjs(rawData.fixedStart).toDate(),
                fixedEnd: dayjs(rawData.fixedEnd).add(1, 'hour').toDate(),
            },
        })

        return this.normalize(result)
    }
}
