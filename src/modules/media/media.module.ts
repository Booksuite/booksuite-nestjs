import { Module } from '@nestjs/common'

import { UploadModule } from '../upload/upload.module'

import { MediaController } from './media.controller'
import { MediaService } from './media.service'

@Module({
    imports: [UploadModule],
    providers: [MediaService],
    controllers: [MediaController],
})
export class MediaModule {}
