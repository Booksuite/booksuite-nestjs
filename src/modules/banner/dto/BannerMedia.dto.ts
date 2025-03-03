import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsInt, IsOptional, IsUUID } from 'class-validator'

export class BannerMediaDTO {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsDefined()
    @IsUUID()
    mediaId: string

    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    @IsInt()
    order?: number
}
