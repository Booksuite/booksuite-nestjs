import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { BannerService } from './banner.service'
import { BannerCreateDTO } from './dto/BannerCreate.dto'
import { BannerResponseDTO } from './dto/BannerResponse.dto'

@Controller('banner')
export class BannerController {
    constructor(private bannerService: BannerService) {}

    @Post('create')
    create(@Body() bannerData: BannerCreateDTO): Promise<BannerResponseDTO> {
        return this.bannerService.create(bannerData)
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<BannerResponseDTO | null> {
        return this.bannerService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() bannerData: BannerCreateDTO) {
        return this.bannerService.update(id, bannerData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.bannerService.delete(id)
    }
}
