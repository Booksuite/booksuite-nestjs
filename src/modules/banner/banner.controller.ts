import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { BannerService } from './banner.service'
import { BannerCreateDTO } from './dto/BannerCreate.dto'
import { BannerResponseDTO } from './dto/BannerResponse.dto'
import { BannerResponseFullDTO } from './dto/BannerResponseFull.dto'

@ApiExtraModels(BannerResponseFullDTO)
@Controller('banner')
export class BannerController {
    constructor(private bannerService: BannerService) {}

    @Post('create')
    create(@Body() bannerData: BannerCreateDTO): Promise<BannerResponseDTO> {
        return this.bannerService.create(bannerData)
    }

    @ApiOkResponse({
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(BannerResponseFullDTO),
                },
                { type: 'null' },
            ],
        },
    })
    @Get(':id')
    getById(@Param('id') id: string): Promise<BannerResponseFullDTO | null> {
        return this.bannerService.getById(id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() bannerData: BannerCreateDTO,
    ): Promise<BannerResponseDTO> {
        return this.bannerService.update(id, bannerData)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.bannerService.delete(id)
    }
}
