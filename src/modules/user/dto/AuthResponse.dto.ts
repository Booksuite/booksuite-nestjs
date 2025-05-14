import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsDefined, IsString } from 'class-validator'
import { UserAuthResponseDTO } from './UserAuthResponse.dto copy'

export class AuthResponseDTO {
    @ApiProperty({ example: '05f317b1-b4b3-4a98-8c08-a84a30aef80f' })
    token!: string

    @ApiProperty({ example: '8c8ab0cb-7689-4357-b446-1348cfe3842d' , type: UserAuthResponseDTO})
    user!: UserAuthResponseDTO
}
