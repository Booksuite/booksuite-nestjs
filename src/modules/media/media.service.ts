import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'
import { UploadService } from '../upload/upload.service'

import { MEDIA_BUCKET_NAME } from './constants'
import { MediaDTO } from './dto/Media.dto'

@Injectable()
export class MediaService {
    constructor(
        private prismaService: PrismaService,
        private uploadService: UploadService,
    ) {}

    upsert(mediaUrl: MediaDTO) {
        const normalizedData = Prisma.validator<Prisma.MediaUpsertArgs>()({
            where: { id: mediaUrl.id },
            update: { url: mediaUrl.id },
            create: mediaUrl,
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

    async uploadFile(files: Express.Multer.File): Promise<Media> {
        const result = await this.uploadService.upload(MEDIA_BUCKET_NAME, files)

        const response = await this.prismaService.media.create({
            data: {
                url: result.url,
                metadata: {
                    mimetype: result.mimetype,
                    key: result.key,
                    bucket: result.bucket,
                },
            },
        })

        return response
    }
}
