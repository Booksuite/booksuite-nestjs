import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { UserCreateDTO } from './dto/UserCreate.dto'
import { UserUpdateDTO } from './dto/UserUpdate.dto'

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

    findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: { email },
        })
    }

    update(id: string, rawData: UserUpdateDTO) {
        return this.prismaService.user.update({
            where: { id },
            data: rawData,
        })
    }

    delete(id: string) {
        return this.prismaService.user.delete({
            where: { id },
        })
    }
}
