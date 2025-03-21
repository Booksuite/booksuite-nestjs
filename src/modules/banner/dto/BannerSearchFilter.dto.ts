import { ApiProperty } from '@nestjs/swagger'
import { BannerPosition } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class BannerSearchFilterDTO {
    @ApiProperty({
        enum: BannerPosition,
        enumName: 'BannerPosition',
        required: false,
    })
    @IsOptional()
    @IsEnum(BannerPosition)
    position?: BannerPosition
}
