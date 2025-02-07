import { Injectable } from '@nestjs/common'

import { Policy } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class PolicyService {
    constructor(private prismaService: PrismaService) {}

    createPolicy(policyData: Policy) {
        return this.prismaService.policy.create({ data: policyData })
    }

    getPolicy(policyID: number) {
        return this.prismaService.policy.findUnique({
            where: { id: policyID },
        })
    }

    updatePolicy(policyData: Policy, policyID: number) {
        return this.prismaService.policy.update({
            where: { id: policyID },
            data: policyData,
        })
    }

    deletePolicy(policyID: number) {
        return this.prismaService.policy.delete({
            where: { id: policyID },
        })
    }
}
