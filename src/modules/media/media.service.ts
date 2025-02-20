import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { MediaCreateDTO } from './dto/MediaCreate.dto'

@Injectable()
export class MediaService {
    constructor(private prismaService: PrismaService) {}

    upsert(mediaUrl: MediaCreateDTO) {
        const omitted = Prisma.validator<Prisma.MediaUpsertArgs>()({
            where: { id: mediaUrl.id },
            update: { url: mediaUrl.id },
            create: { ...omit(mediaUrl, ['metadata']) },
        })

        return this.prismaService.media.upsert({ ...omitted })
    }

    getById(id: string) {
        return this.prismaService.media.findUnique({
            where: { id },
        })
    }

    delete(id: string) {
        return this.prismaService.media.delete({
            where: { id },
        })
    }
}
