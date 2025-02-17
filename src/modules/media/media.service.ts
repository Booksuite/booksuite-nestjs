import { Injectable } from '@nestjs/common'
import { omit } from 'radash'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { MediaCreateDTO } from './dto/MediaCreate.dto'

@Injectable()
export class MediaService {
    constructor(private prismaService: PrismaService) {}

    create(mediaUrl: MediaCreateDTO) {
        const omitted = omit(mediaUrl, ['metadata'])

        return this.prismaService.media.create({
            data: omitted,
        })
    }

    getById(id: string) {
        return this.prismaService.media.findUnique({
            where: { id },
        })
    }

    update(id: string, mediaUrl) {
        const omitted = omit(mediaUrl, ['metadata'])

        return this.prismaService.media.update({
            where: { id },
            data: omitted,
        })
    }

    delete(id: string) {
        return this.prismaService.media.delete({
            where: { id },
        })
    }
}
