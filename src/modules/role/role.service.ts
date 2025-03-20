import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { RoleCreateDTO } from './dto/RoleCreate.dto'
import { RoleUpdateDTO } from './dto/RoleUpdate.dto'

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

    update(id: string, rawData: RoleUpdateDTO) {
        return this.prismaService.role.update({
            where: { id },
            data: rawData,
        })
    }

    delete(id: string) {
        return this.prismaService.role.delete({
            where: { id },
        })
    }
}
