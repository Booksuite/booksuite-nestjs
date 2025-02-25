import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { UPLOAD_PROVIDER } from './constants'
import { CloudFlareProvider } from './providers/CloudFlareProvider'
import { UploadService } from './upload.service'

@Module({
    providers: [
        { provide: UPLOAD_PROVIDER, useClass: CloudFlareProvider },
        UploadService,
        ConfigService,
    ],
    exports: [UploadService],
})
export class UploadModule {}
