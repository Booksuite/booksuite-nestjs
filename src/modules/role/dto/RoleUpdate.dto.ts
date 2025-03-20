import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class RoleUpdateDTO {
    @ApiProperty({ example: 'ADMIN', required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ example: 'admin permissions', required: false })
    @IsOptional()
    @IsString()
    slug?: string

    @ApiProperty({ example: 'create_new_companies', required: false })
    @IsOptional()
    @IsString()
    permissions?: string[]
}
