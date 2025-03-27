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
            reservationWindowStart: dayjs(result.reservationWindowStart).format(
                'YYYY-MM-DD',
            ),
            reservationWindowEnd: dayjs(result.reservationWindowEnd).format(
                'YYYY-MM-DD',
            ),
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
                reservationWindowStart: dayjs(
                    rawData.reservationWindowStart,
                ).toDate(),
                reservationWindowEnd: dayjs(
                    rawData.reservationWindowEnd,
                ).toDate(),
            })

        const result = await this.prismaService.hostingRules.upsert({
            where: { companyId },
            create: normalizedData,
            update: {
                ...rawData,
                reservationWindowStart: dayjs(
                    rawData.reservationWindowStart,
                ).toDate(),
                reservationWindowEnd: dayjs(
                    rawData.reservationWindowEnd,
                ).toDate(),
            },
        })

        return this.normalize(result)
    }
}
