import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { ServiceCreateDTO } from './dtos/ServiceCreate.dto'

@Injectable()
export class ServiceService {
    constructor(private prisma: PrismaService) {}

    create(rawData: ServiceCreateDTO) {
        return this.prisma.$transaction(async (db) => {
            let categoryId = rawData.categoryId as string
            if (rawData.category) {
                const newCategory = await db.serviceCategory.create({
                    data: rawData.category,
                })
                categoryId = newCategory.id
            }

            const omitted = omit(rawData, ['medias', 'categoryId', 'category'])

            const normalizedData = Prisma.validator(
                this.prisma,
                'service',
                'create',
                'data',
            )({
                ...omitted,
                categoryId,
                medias: rawData.medias
                    ? { createMany: { data: rawData.medias } }
                    : undefined,
            })

            return db.service.create({ data: normalizedData })
        })
    }

    getById(id: string) {
        return this.prisma.service.findUnique({ where: { id } })
    }

    update(id: string, rawData: ServiceCreateDTO) {
        const omitted = omit(rawData, ['medias', 'categoryId', 'category'])
        const normalizedData = Prisma.validator(
            this.prisma,
            'service',
            'update',
            'data',
        )(omitted)

        return this.prisma.service.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prisma.service.delete({ where: { id } })
    }
}
