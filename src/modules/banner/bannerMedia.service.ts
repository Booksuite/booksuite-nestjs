import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerMediaDTO } from './dto/BannerMedia.dto'

@Injectable()
export class BannerMediaService {
    constructor(private prismaService: PrismaService) {}

    create(bannerMediaData: BannerMediaDTO) {
        return this.prismaService.bannerMedia.create({
            data: {
                media: { connect: { id: bannerMediaData.mediaId } },
                banner: { connect: { id: bannerMediaData.bannerId } },
            },
        })
    }

    getById(id: string) {
        return this.prismaService.bannerMedia.findUnique({
            where: { id },
        })
    }

    update(id: string, bannerMediaData: BannerMediaDTO) {
        return this.prismaService.bannerMedia.update({
            where: { id },
            data: {
                media: { connect: { id: bannerMediaData.mediaId } },
                banner: { connect: { id: bannerMediaData.bannerId } },
            },
        })
    }

    delete(id: string) {
        return this.prismaService.bannerMedia.delete({
            where: { id },
        })
    }
}
