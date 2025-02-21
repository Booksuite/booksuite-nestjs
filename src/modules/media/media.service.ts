import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { MediaDTO } from './dto/Media.dto'

@Injectable()
export class MediaService {
    constructor(private prismaService: PrismaService) {}

    upsert(mediaUrl: MediaDTO) {
        const normalizedData = Prisma.validator<Prisma.MediaUpsertArgs>()({
            where: { id: mediaUrl.id },
            update: { url: mediaUrl.id },
            create: { ...mediaUrl },
        })

        return this.prismaService.media.upsert({ ...normalizedData })
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
