import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsUUID } from 'class-validator'

export class HousingUnitTypeMediaUpdateDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    mediaId?: string

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @ApiProperty({ example: 1, required: false, nullable: true })
    @IsOptional()
    @IsInt()
    order?: number | null
}
