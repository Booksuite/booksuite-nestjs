import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'
import { BookingPolicyCrateDTO } from '../dto/BookingPolicyCreate.dto'

@Injectable()
export class BookingPolicyService {
    constructor(private prismaService: PrismaService) {}

    create(policyData: BookingPolicyCrateDTO) {
        return this.prismaService.bookingPolicy.create({
            data: policyData,
        })
    }

    getById(id: string) {
        return this.prismaService.bookingPolicy.findUnique({
            where: { id },
        })
    }

    update(id: string, policyData: BookingPolicyCrateDTO) {
        return this.prismaService.bookingPolicy.update({
            where: { id },
            data: policyData,
        })
    }

    delete(id: string) {
        return this.prismaService.bookingPolicy.delete({
            where: { id },
        })
    }
}
