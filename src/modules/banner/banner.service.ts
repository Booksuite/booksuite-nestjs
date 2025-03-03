import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/modules/prisma/prisma.service'

import { BannerCreateDTO } from './dto/BannerCreate.dto'
import { BannerResponseDTO } from './dto/BannerResponse.dto'
import { BannerResponseFullDTO } from './dto/BannerResponseFull.dto'

@Injectable()
export class BannerService {
    constructor(private prismaService: PrismaService) {}

    create(rawData: BannerCreateDTO): Promise<BannerResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.BannerCreateInput>()({
            ...rawData,
            medias: { createMany: { data: rawData.medias } },
        })

        return this.prismaService.banner.create({
            data: normalizedData,
        })
    }

    getById(id: string): Promise<BannerResponseFullDTO | null> {
        return this.prismaService.banner.findUnique({
            where: { id },
            include: { medias: { include: { media: true } } },
        })
    }

    update(id: string, rawData: BannerCreateDTO): Promise<BannerResponseDTO> {
        const normalizedData = Prisma.validator<Prisma.BannerUpdateInput>()({
            ...rawData,
            medias: {
                deleteMany: {
                    bannerId: id,
                    mediaId: {
                        notIn: rawData.medias.map((media) => media.mediaId),
                    },
                },
                createMany: { data: rawData.medias },
            },
        })

        return this.prismaService.banner.update({
            where: { id },
            data: normalizedData,
        })
    }

    delete(id: string) {
        return this.prismaService.banner.delete({
            where: { id },
        })
    }
}
