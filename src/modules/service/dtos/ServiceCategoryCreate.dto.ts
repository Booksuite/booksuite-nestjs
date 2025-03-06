import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator'

export class ServiceCategoryDTO {
    @ApiProperty({ example: '3c39db8f-ec01-4bf1-89e3-a4b458903b2c' })
    @IsOptional()
    @IsUUID()
    id?: string

    @ApiProperty({ example: 'relaxing' })
    @IsDefined()
    @IsString()
    name!: string
}
