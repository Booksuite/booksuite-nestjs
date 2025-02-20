import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class ServiceCategoryCreateDTO {
    @ApiProperty({ example: 'relaxing' })
    @IsDefined()
    @IsString()
    name!: string
}
