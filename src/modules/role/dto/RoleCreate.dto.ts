import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsString } from 'class-validator'

export class RoleCreateDTO {
    @ApiProperty({ example: 'ADMIN' })
    @IsDefined()
    @IsString()
    name!: string

    @ApiProperty({ example: 'admin permissions' })
    @IsDefined()
    @IsString()
    slug!: string

    @ApiProperty({ example: 'create_new_companies' })
    @IsDefined()
    @IsString()
    permissions!: string[]
}
