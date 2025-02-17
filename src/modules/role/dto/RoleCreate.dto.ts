import { IsDefined, IsString } from 'class-validator'

export class RoleCreateDTO {
    @IsDefined()
    @IsString()
    name!: string

    @IsDefined()
    @IsString()
    slug!: string

    @IsDefined()
    @IsString()
    permissions!: string[]
}
