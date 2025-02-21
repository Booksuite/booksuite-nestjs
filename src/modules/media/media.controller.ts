import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { MediaDTO } from './dto/Media.dto'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
    constructor(private mediaService: MediaService) {}

    @Post('create')
    create(@Body() mediaUrl: MediaDTO) {
        return this.mediaService.upsert(mediaUrl)
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.mediaService.getById(id)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.mediaService.delete(id)
    }
}
