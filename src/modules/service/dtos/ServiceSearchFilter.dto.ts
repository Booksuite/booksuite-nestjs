import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDefined } from 'class-validator'

export class ServiceSearchFilterDTO {
    @ApiProperty({ example: true, required: false })
    @IsDefined()
    @IsBoolean()
    published!: boolean
}
