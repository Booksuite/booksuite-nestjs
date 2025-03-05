import {
    Body,
    Controller,
    Delete,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { MEDIA_MAX_UPLOAD_SIZE } from './constants'
import { MediaDTO } from './dto/Media.dto'
import { MediaService } from './media.service'

@Controller('company/:companyId/media')
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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFiles(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: MEDIA_MAX_UPLOAD_SIZE,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.mediaService.uploadFile(file)
    }
}
