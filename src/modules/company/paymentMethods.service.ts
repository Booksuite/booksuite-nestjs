import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { PaymentMethodsDTO } from './dto/PaymentMethods.dto'
import { PaymentMethodsResponseDTO } from './dto/PaymentMethodsResponse.dto'

@Injectable()
export class PaymentMethodsService {
    constructor(private prismaService: PrismaService) {}

    getByCompanyId(
        companyId: string,
    ): Promise<PaymentMethodsResponseDTO | null> {
        return this.prismaService.paymentMethods.findUnique({
            where: { companyId: companyId },
        })
    }

    upsert(
        companyId: string,
        rawData: PaymentMethodsDTO,
    ): Promise<PaymentMethodsResponseDTO> {
        const normalizedData =
            Prisma.validator<Prisma.PaymentMethodsCreateInput>()({
                company: { connect: { id: companyId } },
                ...rawData,
            })
        return this.prismaService.paymentMethods.upsert({
            where: { companyId: companyId },
            create: normalizedData,
            update: { ...normalizedData },
        })
    }
}
