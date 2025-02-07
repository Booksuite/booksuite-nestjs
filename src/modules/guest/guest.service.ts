import { Injectable } from '@nestjs/common'

import { Guest } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class GuestService {
    constructor(private prismaService: PrismaService) {}

    assignGuest(guestData: Guest) {
        return this.prismaService.guest.create({ data: guestData })
    }

    getGuest(guestID: number) {
        return this.prismaService.guest.findUnique({
            where: { id: guestID },
        })
    }

    updateGuest(guestData: Guest, guestID: number) {
        return this.prismaService.guest.update({
            where: { id: guestID },
            data: guestData,
        })
    }

    deleteGuest(guestID: number) {
        return this.prismaService.guest.delete({
            where: { id: guestID },
        })
    }
}
