import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerCreateDTO } from './dto/BannerCreate.dto'

@Injectable()
export class BannerService {
    constructor(private prismaService: PrismaService) {}

    create(bannerData: BannerCreateDTO) {
        return this.prismaService.banner.create({
            data: bannerData,
        })
    }

    getById(id: string) {
        return this.prismaService.banner.findUnique({
            where: { id: id },
        })
    }

    update(id: string, bannerData: BannerCreateDTO) {
        return this.prismaService.banner.update({
            where: { id: id },
            data: bannerData,
        })
    }

    delete(id: string) {
        return this.prismaService.banner.delete({
            where: { id: id },
        })
    }
}
