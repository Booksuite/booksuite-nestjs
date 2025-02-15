import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerMediaCreateDTO } from './dto/BannerMediaCreate.dto'

@Injectable()
export class BannerMediaService {
    constructor(private prismaService: PrismaService) {}

    create(bannerMediaData: BannerMediaCreateDTO) {
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

    update(id: string, bannerMediaData: BannerMediaCreateDTO) {
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
