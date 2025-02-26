export type UploadResponse = {
    url: string
    key: string
    mimetype: string
    bucket: string
}

export interface UploadProvider {
    upload(bucket: string, file: Express.Multer.File): Promise<UploadResponse>

    uploadMany(
        bucket: string,
        files: Array<Express.Multer.File>,
    ): Promise<UploadResponse[]>
}
