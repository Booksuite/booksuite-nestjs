import {
    Body,
    Controller,
    Delete,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger'

import { MEDIA_MAX_UPLOAD_SIZE } from './constants'
import { MediaDTO } from './dto/Media.dto'
import { MediaResponseDTO } from './dto/MediaResponse.dto'
import { MediaResponsePaginatedDTO } from './dto/MediaResponsePaginated.dto'
import { MediaSearchBodyDTO } from './dto/MediaSearchBody.dto'
import { MediaService } from './media.service'

@Controller('company/:companyId/media')
export class MediaController {
    constructor(private mediaService: MediaService) {}

    @ApiOkResponse({ type: MediaResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'upsertMedia' })
    @Patch('upsert')
    upsert(@Param('companyId') companyId: string, @Body() data: MediaDTO) {
        return this.mediaService.upsert(companyId, data)
    }

    @ApiOkResponse({ type: MediaResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'getMediaById' })
    @Get(':id')
    getByID(@Param('id') id: string) {
        return this.mediaService.getById(id)
    }

    @Post('search')
    @ApiParam({ name: 'companyId', type: String })
    @ApiBody({ type: MediaSearchBodyDTO })
    @ApiOkResponse({ type: MediaResponsePaginatedDTO })
    @ApiQuery({ name: 'query', type: String, required: false })
    @ApiOperation({ operationId: 'searchMedia' })
    search(
        @Param('companyId') companyId: string,
        @Body() body: MediaSearchBodyDTO,
        @Query('query') query?: string,
    ): Promise<MediaResponsePaginatedDTO> {
        return this.mediaService.search(
            companyId,
            body.pagination,
            body.filter,
            body.order,
            query,
        )
    }

    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'deleteMedia' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.mediaService.delete(id)
    }

    @ApiOkResponse({ type: MediaResponseDTO })
    @ApiParam({ name: 'companyId', type: String })
    @ApiOperation({ operationId: 'uploadMedia' })
    @ApiConsumes('multipart/form-data')
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadFiles(
        @Param('companyId') companyId: string,
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
        return this.mediaService.uploadFile(companyId, file)
    }
}
