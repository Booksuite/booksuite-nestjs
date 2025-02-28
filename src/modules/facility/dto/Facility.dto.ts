import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator'

export class FacilityDTO {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    id?: string

    @ApiProperty({ example: 'WiFi' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'wifi-icon', required: false })
    @IsDefined()
    @IsString()
    icon?: string
}
