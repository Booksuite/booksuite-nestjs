import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common'

import { MediaCreateDTO } from './dto/MediaCreate.dto'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
    constructor(private mediaService: MediaService) {}

    @Post('create')
    create(@Body() mediaUrl: MediaCreateDTO) {
        return this.mediaService.create(mediaUrl)
    }

    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.mediaService.getById(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() mediaUrl: MediaCreateDTO) {
        return this.mediaService.update(id, mediaUrl)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.mediaService.delete(id)
    }
}
