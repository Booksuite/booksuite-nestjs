import { ApiProperty } from '@nestjs/swagger'

export class BannerMediaResponseDTO {
    @ApiProperty({ example: 2, required: false })
    order?: number | null

    @ApiProperty({ example: 'a89f8dc0-4d03-483a-8803-9c4a4c2ab878' })
    bannerId: string

    @ApiProperty({ example: '127dc7ef-1d16-4735-8c74-8821fe06ca5b' })
    mediaId: string
}
