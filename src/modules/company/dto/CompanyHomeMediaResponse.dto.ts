import { ApiProperty } from '@nestjs/swagger'

import { MediaDTO } from '@/modules/media/dto/Media.dto'

export class CompanyHomeMediaResponseDTO {
    @ApiProperty({ example: 'e23d2e3e-6bf9-4b7c-8aec-73c37a5b9d8f' })
    media: MediaDTO

    @ApiProperty({ example: 1, type: Number })
    order: number | null

    @ApiProperty({
        example: 'e23d2e3e-6bf9-4b7c-8aec-73c37a5b9d8f',
        type: String,
    })
    companyId: string
}
