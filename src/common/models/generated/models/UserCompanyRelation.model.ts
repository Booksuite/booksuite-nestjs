import { IsDefined, IsString } from 'class-validator'

export class UserCompanyRelation {
    @IsDefined()
    @IsString()
    id!: string

    @IsDefined()
    @IsString()
    userId!: string

    @IsDefined()
    @IsString()
    companyId!: string

    @IsDefined()
    @IsString()
    roleId!: string

    @IsDefined()
    @IsString()
    permissions!: string[]
}
