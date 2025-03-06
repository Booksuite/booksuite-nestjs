import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class ServiceSearchQueryDTO {
    @ApiProperty({ example: true, required: false })
    @IsDefined()
    @IsString()
    published!: boolean
}
