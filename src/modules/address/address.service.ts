import { Injectable } from '@nestjs/common'

import { Address } from '@/common/models/generated/models'
import { PrismaService } from '@/modules/prisma/prisma.service'

@Injectable()
export class AddressService {
    constructor(private prismaService: PrismaService) {}

    createAddress(addressData: Address) {
        return this.prismaService.address.create({ data: addressData })
    }

    getAddress(addressID: number) {
        return this.prismaService.address.findUnique({
            where: { id: addressID },
        })
    }

    updateAddress(addressData: Address, addressID: number) {
        return this.prismaService.address.update({
            where: { id: addressID },
            data: addressData,
        })
    }

    deleteAddress(addressID: number) {
        return this.prismaService.address.delete({
            where: { id: addressID },
        })
    }
}
