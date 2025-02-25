import {
    CreateBucketCommand,
    GetBucketAclCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { UploadProvider, UploadResponse } from '../types/UploadProvider'

@Injectable()
export class CloudFlareProvider implements UploadProvider {
    private client: S3Client
    private accountBaseUrl: string

    constructor(private configService: ConfigService) {
        const accessKeyId = this.configService.get<string>(
            'CLOUDFLARE_ACCESS_KEY_ID',
        )
        const secretAccessKey = this.configService.get<string>(
            'CLOUDFLARE_SECRET_ACCESS_KEY',
        )
        const baseUrl = this.configService.get<string>(
            'CLOUDFLARE_UPLOAD_PROVIDER_BASE_URL',
        )

        if (!accessKeyId || !secretAccessKey || !baseUrl)
            throw new Error('Missing S3 credentials')

        this.accountBaseUrl = baseUrl

        this.client = new S3Client({
            region: 'auto',
            endpoint: this.accountBaseUrl,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        })
    }

    public async uploadMany(
        bucket: string,
        files: Array<Express.Multer.File>,
    ): Promise<UploadResponse[]> {
        const bucketExists = await this.bucketExists(bucket)
        if (!bucketExists) await this.createBucket(bucket)

        const uploadPromises = files.map((file) =>
            this.handleUploadFile(bucket, file),
        )

        const result = await Promise.all(uploadPromises)

        return result
    }

    public async upload(
        bucket: string,
        file: Express.Multer.File,
    ): Promise<UploadResponse> {
        const bucketExists = await this.bucketExists(bucket)
        if (!bucketExists) await this.createBucket(bucket)

        const result = await this.handleUploadFile(bucket, file)

        return result
    }

    private async handleUploadFile(
        bucket: string,
        file: Express.Multer.File,
    ): Promise<UploadResponse> {
        await this.client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: file.originalname,
                Body: file.buffer,
            }),
        )
        return {
            url: `${this.accountBaseUrl}/${bucket}/${file.originalname}`,
        }
    }

    private async bucketExists(bucket: string): Promise<boolean> {
        try {
            await this.client.send(
                new GetBucketAclCommand({
                    Bucket: bucket,
                }),
            )
            return true
        } catch (error) {
            if (error['$metadata'].httpStatusCode === 404) {
                return false
            }
            throw error
        }
    }

    private createBucket(bucket: string) {
        return this.client.send(
            new CreateBucketCommand({
                Bucket: bucket,
            }),
        )
    }
}
