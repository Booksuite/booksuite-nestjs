import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { RoleCreateDTO } from './dto/RoleCreate.dto'

@Injectable()
export class RoleService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: RoleCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.RoleCreateInput>()(rawData)

        return this.prismaService.role.create({
            data: normalizedData,
        })
    }

    getById(id: string) {
        return this.prismaService.role.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: RoleCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.RoleUpdateInput>()(rawData)

        return this.prismaService.role.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.role.delete({
            where: { id },
        })
    }
}
