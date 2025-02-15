import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { UserCreateDTO } from './dto/UserCreate.dto'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: UserCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.UserCreateInput>()(rawData)

        return this.prismaService.user.create({
            data: normalizedData,
        })
    }

    getById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: UserCreateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.UserUpdateInput>()(rawData)

        return this.prismaService.user.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.user.delete({
            where: { id },
        })
    }
}
