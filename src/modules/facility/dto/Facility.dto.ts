import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class FacilityDTO {
    @ApiProperty({ example: 'WiFi' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'wifi-icon', required: false })
    @IsDefined()
    @IsString()
    icon?: string
}
