import { IsDate, IsDefined, IsString } from 'class-validator'

import { UserCompanyRelation } from './'

export class Role {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    slug!: string

    @IsDefined()
    @IsString()
    permissions!: string[]

    @IsDefined()
    @IsDate()
    createdAt!: Date

    @IsDefined()
    userCompanyRelation!: UserCompanyRelation[]
}
