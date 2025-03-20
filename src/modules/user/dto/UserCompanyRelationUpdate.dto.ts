import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UserCompanyRelationUpdateDTO {
    @ApiProperty({
        example: '05f317b1-b4b3-4a98-8c08-a84a30aef80f',
        required: false,
    })
    @IsOptional()
    @IsString()
    userId?: string

    @ApiProperty({
        example: '8c8ab0cb-7689-4357-b446-1348cfe3842d',
        required: false,
    })
    @IsOptional()
    @IsString()
    companyId?: string

    @ApiProperty({
        example: 'd68ffa59-0c42-49a6-b6d8-312569e33505',
        required: false,
    })
    @IsOptional()
    @IsString()
    roleId?: string

    @ApiProperty({ example: 'create_new_housingTypes', required: false })
    @IsOptional()
    @IsString()
    permissions?: string[]
}
