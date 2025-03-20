import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { UserCompanyRelationDTO } from './dto/UserCompanyRelationCreate.dto'
import { UserCompanyRelationUpdateDTO } from './dto/UserCompanyRelationUpdate.dto'

@Injectable()
export class UserCompanyRelationService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: UserCompanyRelationDTO) {
        const normalizedData =
            Prisma.validator<Prisma.UserCompanyRelationCreateInput>()({
                ...omit(rawData, ['companyId', 'roleId', 'userId']),
                company: { connect: { id: rawData.companyId } },
                role: { connect: { id: rawData.roleId } },
                user: { connect: { id: rawData.userId } },
            })

        return this.prismaService.userCompanyRelation.create({
            data: normalizedData,
        })
    }

    getById(id: string) {
        return this.prismaService.userCompanyRelation.findUnique({
            where: { id },
        })
    }

    update(id: string, rawData: UserCompanyRelationUpdateDTO) {
        const normalizedData =
            Prisma.validator<Prisma.UserCompanyRelationUpdateInput>()({
                ...omit(rawData, ['companyId', 'roleId', 'userId']),
            })

        return this.prismaService.userCompanyRelation.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.userCompanyRelation.delete({
            where: { id },
        })
    }
}
