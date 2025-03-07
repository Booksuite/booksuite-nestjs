import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PaginationQuery } from '@/common/types/pagination'
import {
    buildPaginatedResponse,
    getPaginatedParams,
} from '@/common/utils/pagination'
import { PrismaService } from '@/modules/prisma/prisma.service'
import { UploadService } from '../upload/upload.service'

import { MEDIA_BUCKET_NAME } from './constants'
import { MediaDTO } from './dto/Media.dto'
import { MediaOrderByDTO } from './dto/MediaOrderBy.dto'
import { MediaResponsePaginatedDTO } from './dto/MediaResponsePaginated.dto'

@Injectable()
export class MediaService {
    constructor(
        private prismaService: PrismaService,
        private uploadService: UploadService,
    ) {}

    upsert(rawData: MediaDTO) {
        const normalizedData = Prisma.validator<Prisma.MediaUpsertArgs>()({
            where: { id: rawData.id },
            update: { url: rawData.url, metadata: rawData.metadata },
            create: rawData,
        })

        return this.prismaService.media.upsert(normalizedData)
    }

    async search(
        companyId: string,
        pagination: PaginationQuery,
        order?: MediaOrderByDTO,
        query?: string,
    ): Promise<MediaResponsePaginatedDTO> {
        const paginationParams = getPaginatedParams(pagination)

        const [medias, total] = await this.prismaService.media.findManyAndCount(
            {
                where: {
                    companyId: companyId,
                    ...this.buildSearchParams(query),
                },
                ...paginationParams,
                orderBy: order ? { [order.orderBy]: order.order } : undefined,
            },
        )

        return buildPaginatedResponse(medias, total, pagination)
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

    async uploadFile(companyId: string, files: Express.Multer.File) {
        const result = await this.uploadService.upload(MEDIA_BUCKET_NAME, files)

        const response = await this.prismaService.media.create({
            data: {
                url: result.url,
                companyId,
                metadata: {
                    mimetype: result.mimetype,
                    key: result.key,
                    bucket: result.bucket,
                },
            },
        })

        return response
    }

    private buildSearchParams(query?: string): Prisma.MediaWhereInput {
        const data: Prisma.MediaWhereInput = {}

        if (query) {
            data.OR = [{ url: { contains: query, mode: 'insensitive' } }]
        }

        return data
    }
}
