import { IsDefined, IsString } from 'class-validator'

import { Company, Role, User } from './'

export class UserCompanyRelation {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    userId!: string

    @IsDefined()
    user!: User

    @IsDefined()
    @IsString()
    companyId!: string

    @IsDefined()
    company!: Company

    @IsDefined()
    @IsString()
    roleId!: string

    @IsDefined()
    role!: Role

    @IsDefined()
    @IsString()
    permissions!: string[]
}
