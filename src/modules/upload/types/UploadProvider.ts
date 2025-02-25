export type UploadResponse = {
    url: string
}

export interface UploadProvider {
    upload(bucket: string, file: Express.Multer.File): Promise<UploadResponse>

    uploadMany(
        bucket: string,
        files: Array<Express.Multer.File>,
    ): Promise<UploadResponse[]>
}

/*

1. veficar se esiste o bucket
2. se não existe, criar o bucket
3. fazer o upload do arquivo
4. retornar a url do arquivo

*/
