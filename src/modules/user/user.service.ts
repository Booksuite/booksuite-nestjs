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
            include: {
                userCompanyRelation: true,
            },
        })
    }

    async createWithCompany(rawData: UserCreateDTO, companyId: string) {
        if (!companyId) {
            throw new Error('Company ID is required')
        }

        const normalizedData = Prisma.validator<Prisma.UserCreateInput>()(rawData)

        // Create user and user-company relation in a transaction
        return this.prismaService.$transaction(async (prisma) => {
            // Create the user
            const user = await prisma.user.create({
                data: normalizedData,
            })

            // Get the default role (you might want to adjust this based on your needs)
            const defaultRole = await prisma.role.findFirst({
                where: {
                    slug: 'user', // Assuming you have a default 'user' role
                },
            })

            if (!defaultRole) {
                throw new Error('Default role not found')
            }

            // Create the user-company relation with generic permissions
            const userCompanyRelation = await prisma.userCompanyRelation.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    company: {
                        connect: {
                            id: companyId
                        }
                    },
                    role: {
                        connect: {
                            id: defaultRole.id
                        }
                    },
                    permissions: ['read:facility', 'write:facility'],
                },
            })

            return {
                user,
                userCompanyRelation
            }
        })
    }

    getById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
        })
    }

    findByEmail(email: string, companyId: string) {
        return this.prismaService.user.findUnique({
            where: { email },
            include: {
                userCompanyRelation: {
                    where: { companyId },
                },
            },
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
