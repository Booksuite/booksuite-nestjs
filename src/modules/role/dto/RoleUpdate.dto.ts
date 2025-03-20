import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class RoleUpdateDTO {
    @ApiProperty({ example: 'ADMIN', required: false, type: String })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({
        example: 'admin permissions',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    slug?: string

    @ApiProperty({
        example: 'create_new_companies',
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsString()
    permissions?: string[]
}
