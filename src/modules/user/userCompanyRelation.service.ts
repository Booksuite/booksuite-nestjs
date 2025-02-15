import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit, pick } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { UserCompanyRelationDTO } from './dto/UserCompanyRelationCreate.dto'

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

    update(id: string, rawData: UserCompanyRelationDTO) {
        const normalizedData =
            Prisma.validator<Prisma.UserCompanyRelationUpdateInput>()({
                ...pick(rawData, ['permissions']),
                role: { connect: { id: rawData.roleId } },
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
