import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class FacilityCreateDTO {
    @ApiProperty({ example: 'WiFi' })
    @IsDefined()
    @IsString()
    name!: string
}
