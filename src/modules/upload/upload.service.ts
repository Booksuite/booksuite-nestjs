import { Inject, Injectable } from '@nestjs/common'

import { UPLOAD_PROVIDER } from './constants'
import { UploadProvider } from './types/UploadProvider'

@Injectable()
export class UploadService {
    constructor(
        @Inject(UPLOAD_PROVIDER) private uploadProvider: UploadProvider,
    ) {}

    upload(bucket: string, file: Express.Multer.File) {
        return this.uploadProvider.upload(bucket, file)
    }

    uploadMany(bucket: string, files: Express.Multer.File[]) {
        return this.uploadProvider.uploadMany(bucket, files)
    }
}
