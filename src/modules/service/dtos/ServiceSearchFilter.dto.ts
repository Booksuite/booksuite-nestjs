import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class ServiceSearchFilterDTO {
    @ApiProperty({ example: true, required: false })
    @IsDefined()
    @IsString()
    published!: boolean
}
