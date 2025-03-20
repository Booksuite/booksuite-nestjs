import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsUUID } from 'class-validator'

export class HousingUnitTypeMediaUpdateDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsUUID()
    mediaId?: string

    @ApiProperty({ example: true, required: false, type: Boolean })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean

    @ApiProperty({ example: 1, required: false, nullable: true, type: Number })
    @IsOptional()
    @IsInt()
    order?: number | null
}
