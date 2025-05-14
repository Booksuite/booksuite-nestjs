import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { IsDefined, IsString } from 'class-validator'
import { UserResponseDTO } from './UserResponse.dto'
import { UserCompanyRelationResponseDTO } from './UserCompanyRelationResponse.dto'

export class UserAuthResponseDTO extends UserResponseDTO{
    @ApiProperty({ example: '05f317b1-b4b3-4a98-8c08-a84a30aef80f' , type: [UserCompanyRelationResponseDTO]})
    userCompanyRelation!: UserCompanyRelationResponseDTO[]
}
