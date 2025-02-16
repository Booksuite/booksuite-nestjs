import { Injectable } from '@nestjs/common'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { CancellationPolicyCreateDTO } from './dto/CancellationPolicyCreate.dto'

@Injectable()
export class CancellationPolicyService {
    constructor(private prismaService: PrismaService) {}

    create(policyData: CancellationPolicyCreateDTO) {
        return this.prismaService.cancellationPolicy.create({
            data: {
                ...policyData,
                penaltyRanges: {
                    createMany: { data: policyData.penaltyRanges },
                },
            },
        })
    }

    getById(id: string) {
        return this.prismaService.cancellationPolicy.findUnique({
            where: { id },
        })
    }

    update(id: string, policyData: CancellationPolicyCreateDTO) {
        const omitted = omit(policyData, ['penaltyRanges'])

        return this.prismaService.cancellationPolicy.update({
            where: { id },
            data: omitted,
        })
    }

    delete(id: string) {
        return this.prismaService.cancellationPolicy.delete({
            where: { id },
        })
    }
}
